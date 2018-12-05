import * as React from 'react';
import {
	ActivityIndicator,
	Animated,
	FlatList,
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
	ProfilePhotoGrid,
	ProfileTopContainer,
	WallPost,
} from '../../components';
import { PROFILE_TAB_ICON_TYPES } from '../../environment/consts';
import { ICurrentUser, INavigationProps, ITranslatedProps, IWallPost } from '../../types';

import styles, { colors, icons, SCREEN_HEIGHT } from './MyProfileScreen.style';

interface IMyProfileScreenViewProps extends ITranslatedProps, INavigationProps {
	currentUser: ICurrentUser;
	refreshing: boolean;
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
}

export const MyProfileScreenView: React.SFC<IMyProfileScreenViewProps> = ({
	currentUser,
	refreshing,
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
	navigation,
	getText,
}) => {
	const {
		userId,
		avatar,
		fullName,
		userName,
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
		hasPhotos || hasPosts ? styles.scrollContainer : [styles.scrollContainer, { flex: 1 }];

	return (
		<View style={styles.container}>
			<Header
				title={getText('my.profile.screen.title')}
				left={
					<IconButton
						iconSource={icons.shareIconWhite}
						iconType="image"
						iconStyle={styles.icon}
						onPress={onSharePress}
					/>
				}
				right={<OptionsMenuButton onPress={onShowOptionsMenu} />}
			/>
			<View style={styles.whiteBottomView} />
			<ScrollView
				contentContainerStyle={scrollContainerStyles}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.white} />
				}
				scrollEnabled={hasPhotos || hasPosts}
			>
				<ProfileTopContainer
					userId={userId}
					avatar={avatar}
					fullName={fullName}
					userName={userName}
					description={description}
					numberOfFriends={numberOfFriends}
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					numberOfComments={numberOfComments}
					relationship={null}
					isCurrentUser={true}
					tabs={true}
					activeTab={activeTab}
					onProfilePhotoPress={onProfilePhotoPress}
					onAddFriend={() => undefined}
					onEditProfile={onEditProfile}
					onIconPress={onIconPress}
					getText={getText}
				/>
				{loadingPosts ? (
					<View style={styles.loading}>
						<ActivityIndicator size="large" />
					</View>
				) : (
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
										<WallPost
											postId={data.item}
											commentInput={false}
											onAddComment={() => undefined}
											navigation={navigation}
										/>
									</View>
								)}
								showsVerticalScrollIndicator={false}
								ListEmptyComponent={<NoContent posts={true} getText={getText} />}
							/>
						</Animated.View>
						<Animated.View
							onLayout={(event: any) => {
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
										height: hasPhotos ? 1 : SCREEN_HEIGHT,
									}}
									disabled={hasPhotos}
									getText={getText}
								/>
							) : (
								<NoContent gallery={true} getText={getText} />
							)}
						</Animated.View>
					</View>
				)}
			</ScrollView>
		</View>
	);
};
