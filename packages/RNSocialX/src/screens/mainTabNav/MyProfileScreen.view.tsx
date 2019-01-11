import * as React from 'react';
import {
	Animated,
	FlatList,
	LayoutChangeEvent,
	Platform,
	RefreshControl,
	ScrollView,
	View,
} from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';

import {
	Header,
	IconButton,
	NoContent,
	OptionsMenuButton,
	Profile,
	ProfilePhotoGrid,
	WallPost,
} from '../../components';
import { OS_TYPES, PROFILE_TAB_ICON_TYPES } from '../../environment/consts';
import { ICurrentUser, INavigationProps, ITranslatedProps } from '../../types';

import { Colors, Icons } from '../../environment/theme';
import styles, { SCREEN_HEIGHT } from './MyProfileScreen.style';

interface IMyProfileScreenViewProps extends ITranslatedProps, INavigationProps {
	currentUser: ICurrentUser;
	hasFriends: boolean;
	loadingProfile: boolean;
	loadingPosts: boolean;
	dataProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
	onRefresh: () => void;
	onProfilePhotoPress: () => void;
	onLoadMorePhotos: () => void;
	onViewMedia: (index: number) => void;
	onEditProfile: () => void;
	onSharePress: () => void;
	onShowOptionsMenu: () => void;
	onIconPress: (tab: string) => void;
	onLayoutChange: (height: number) => void;
	onViewFriends: (alias: string) => void;
}

export const MyProfileScreenView: React.SFC<IMyProfileScreenViewProps> = ({
	currentUser,
	hasFriends,
	loadingProfile,
	loadingPosts,
	dataProvider,
	listTranslate,
	gridTranslate,
	activeTab,
	containerHeight,
	onRefresh,
	onIconPress,
	onLayoutChange,
	onLoadMorePhotos,
	onViewMedia,
	onProfilePhotoPress,
	onEditProfile,
	onSharePress,
	onShowOptionsMenu,
	onViewFriends,
	navigation,
	getText,
}) => {
	const {
		alias,
		avatar,
		fullName,
		numberOfPhotos,
		numberOfLikes,
		numberOfFriends,
		numberOfComments,
		description,
		postIds,
	} = currentUser;

	const hasPhotos = numberOfPhotos > 0;
	const hasPosts = postIds.length > 0;

	let contentContainerStyle;
	if (activeTab === PROFILE_TAB_ICON_TYPES.GRID && containerHeight !== 0) {
		contentContainerStyle =
			containerHeight < SCREEN_HEIGHT / 2
				? [styles.contentContainer, { height: SCREEN_HEIGHT / 2 }]
				: [styles.contentContainer, { height: containerHeight }];
	} else {
		contentContainerStyle = styles.contentContainer;
	}

	const scrollContainerStyles =
		hasPhotos || hasPosts ? styles.scrollContainer : [styles.scrollContainer, { flexGrow: 1 }];

	return (
		<View style={styles.container}>
			<Header
				title={getText('my.profile.screen.title')}
				// left={
				// 	<IconButton
				// 		iconSource={Icons.shareIconWhite}
				// 		iconType="image"
				// 		iconStyle={styles.icon}
				// 		onPress={onSharePress}
				// 	/>
				// }
				right={<OptionsMenuButton onPress={onShowOptionsMenu} />}
			/>
			<ScrollView
				contentContainerStyle={scrollContainerStyles}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={loadingProfile}
						onRefresh={onRefresh}
						tintColor={Colors.white}
						progressBackgroundColor={Colors.white}
					/>
				}
				scrollEnabled={!loadingPosts}
			>
				<Profile
					alias={alias}
					avatar={avatar}
					fullName={fullName}
					description={description}
					numberOfFriends={numberOfFriends}
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					numberOfComments={numberOfComments}
					isCurrentUser={true}
					tabs={hasPosts}
					activeTab={activeTab}
					friends={hasFriends}
					onProfilePhotoPress={onProfilePhotoPress}
					onAddFriend={() => undefined}
					onEditProfile={onEditProfile}
					onIconPress={onIconPress}
					onViewFriends={onViewFriends}
					getText={getText}
				/>
				<View style={contentContainerStyle}>
					<Animated.View
						style={[styles.postsContainer, { transform: [{ translateX: listTranslate }] }]}
					>
						<FlatList
							windowSize={10}
							data={postIds}
							keyExtractor={(id) => id}
							renderItem={(data) => (
								<View style={styles.post}>
									<WallPost postId={data.item} commentInput={false} navigation={navigation} />
								</View>
							)}
							showsVerticalScrollIndicator={false}
							scrollEnabled={postIds.length > 0}
							ListEmptyComponent={<NoContent posts={true} getText={getText} />}
						/>
						{Platform.OS === OS_TYPES.IOS && (
							<View
								style={{
									backgroundColor: Colors.white,
									height: SCREEN_HEIGHT / 2,
									position: 'absolute',
									bottom: -SCREEN_HEIGHT / 2,
									left: 0,
									right: 0,
								}}
							/>
						)}
					</Animated.View>
					<Animated.View
						onLayout={(event: LayoutChangeEvent) => {
							if (containerHeight !== event.nativeEvent.layout.height) {
								onLayoutChange(event.nativeEvent.layout.height);
							}
						}}
						style={[styles.gridContainer, { transform: [{ translateX: gridTranslate }] }]}
					>
						{hasPhotos ? (
							<ProfilePhotoGrid
								onLoadMorePhotos={onLoadMorePhotos}
								dataProvider={dataProvider}
								onViewMedia={onViewMedia}
								header={{
									element: <View style={{ width: 1, height: 1 }} />,
									height: 1,
								}}
								disabled={hasPhotos}
								getText={getText}
							/>
						) : (
							<NoContent gallery={true} getText={getText} />
						)}
						{Platform.OS === OS_TYPES.IOS && (
							<View
								style={{
									backgroundColor: Colors.white,
									height: SCREEN_HEIGHT / 2,
									position: 'absolute',
									bottom: -SCREEN_HEIGHT / 2,
									left: 0,
									right: 0,
								}}
							/>
						)}
					</Animated.View>
				</View>
			</ScrollView>
		</View>
	);
};
