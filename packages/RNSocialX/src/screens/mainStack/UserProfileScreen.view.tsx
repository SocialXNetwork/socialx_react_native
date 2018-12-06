import * as React from 'react';
import {
	ActivityIndicator,
	Animated,
	Dimensions,
	FlatList,
	RefreshControl,
	ScrollView,
	View,
} from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';

import {
	Header,
	HeaderButton,
	NoContent,
	ProfilePhotoGrid,
	ProfileTopContainer,
	WallPost,
} from '../../components';
import { PROFILE_TAB_ICON_TYPES } from '../../environment/consts';
import { INavigationProps, ITranslatedProps, IVisitedUser, IWallPost } from '../../types';

import styles, { colors } from './UserProfileScreen.style';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface IUserProfileScreenViewProps extends INavigationProps, ITranslatedProps {
	visitedUser: IVisitedUser;
	refreshing: boolean;
	loadingPosts: boolean;
	dataProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
	onRefresh: () => void;
	onGoBack: () => void;
	onAddFriend: () => void;
	onShowFriendshipOptions: () => void;
	onProfilePhotoPress: () => void;
	onLoadMorePhotos: () => void;
	onViewMedia: (index: number) => void;
	onIconPress: (tab: string) => void;
	onLayoutChange: (height: number) => void;
}

export const UserProfileScreenView: React.SFC<IUserProfileScreenViewProps> = ({
	visitedUser,
	refreshing,
	loadingPosts,
	dataProvider,
	listTranslate,
	gridTranslate,
	activeTab,
	containerHeight,
	onAddFriend,
	onRefresh,
	onShowFriendshipOptions,
	onProfilePhotoPress,
	onViewMedia,
	onLoadMorePhotos,
	onIconPress,
	onLayoutChange,
	onGoBack,
	navigation,
	getText,
}) => {
	const {
		userId,
		postIds,
		numberOfLikes,
		numberOfPhotos,
		numberOfFriends,
		numberOfComments,
		avatar,
		fullName,
		userName,
		description,
		relationship,
	} = visitedUser;

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
				title={getText('user.profile.screen.title')}
				left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
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
					relationship={relationship}
					numberOfFriends={numberOfFriends}
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					numberOfComments={numberOfComments}
					isCurrentUser={false}
					tabs={true}
					activeTab={activeTab}
					onProfilePhotoPress={onProfilePhotoPress}
					onAddFriend={onAddFriend}
					onShowFriendshipOptions={onShowFriendshipOptions}
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
										<WallPost postId={data.item} commentInput={false} navigation={navigation} />
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
