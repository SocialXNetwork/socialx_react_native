import * as React from 'react';
import {Animated, Dimensions, RefreshControl, ScrollView, View} from 'react-native';
import {AnimatedValue} from 'react-navigation';
import {DataProvider} from 'recyclerlistview';

import {IWallPostCardProps, NoPhotos, ProfilePhotoGrid, ProfileTopContainer, WallPostCard} from '../../components';
import {IWithLoaderProps, WithInlineLoader} from '../../components/inlineLoader';
import {PROFILE_TAB_ICON_TYPES} from '../../environment/consts';
import {ICurrentUser, ILike, ITranslatedProps, SearchResultKind} from '../../types';

import styles, {colors} from './UserProfileScreen.style';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface IUserProfileScreenViewProps extends IWithLoaderProps, ITranslatedProps {
	avatarURL: any;
	fullName: string;
	userName: false | string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFriends: number;
	numberOfViews: number;
	onAddFriend: () => void;
	onShowFriendshipOptions: () => void;
	relationship: SearchResultKind;
	onViewProfilePhoto: () => void;
	aboutMeText: string;
	recentPosts: IWallPostCardProps[];
	loadMorePhotosHandler: () => void;
	onCommentPress: any;
	onImagePress: (index: number, media: any) => void;
	onLikePress: (likedByMe: boolean, postId: string) => boolean;
	onRefresh: () => void;
	refreshing: boolean;
	gridMediaProvider: DataProvider;
	onViewMediaFullscreen: (index: number) => void;
	currentUser: ICurrentUser;
	onIconPress: (tab: string) => void;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
	onLayoutChange: (height: number) => void;
}

export const UserProfileScreenView: React.SFC<IUserProfileScreenViewProps> = ({
	refreshing,
	gridMediaProvider,
	avatarURL,
	fullName,
	userName = false,
	numberOfPhotos,
	onAddFriend,
	onShowFriendshipOptions,
	numberOfLikes,
	numberOfFriends,
	onViewProfilePhoto,
	relationship,
	onRefresh,
	onViewMediaFullscreen,
	loadMorePhotosHandler,
	recentPosts,
	onCommentPress,
	onImagePress,
	onLikePress,
	aboutMeText,
	numberOfViews,
	currentUser,
	onIconPress,
	listTranslate,
	gridTranslate,
	activeTab,
	containerHeight,
	onLayoutChange,
	isLoading,
	getText,
}) => {
	const hasPhotos = numberOfPhotos !== 0;

	let contentContainerStyle;
	if (activeTab === PROFILE_TAB_ICON_TYPES.GRID && containerHeight !== 0) {
		contentContainerStyle =
			containerHeight < SCREEN_HEIGHT / 2
				? [styles.contentContainer, {height: SCREEN_HEIGHT / 2}]
				: [styles.contentContainer, {height: containerHeight}];
	} else {
		contentContainerStyle = styles.contentContainer;
	}

	const scrollContainerStyles = hasPhotos ? styles.scrollContainer : [styles.scrollContainer, {flex: 1}];

	return (
		<WithInlineLoader isLoading={isLoading}>
			<View style={styles.container}>
				<View style={styles.whiteBottomView} />
				<ScrollView
					contentContainerStyle={scrollContainerStyles}
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.white} />}
					scrollEnabled={hasPhotos}
				>
					{
						// @ts-ignore
						<ProfileTopContainer
							avatarURL={avatarURL}
							fullName={fullName}
							userName={userName}
							numberOfFriends={numberOfFriends}
							numberOfLikes={numberOfLikes}
							numberOfPhotos={numberOfPhotos}
							numberOfViews={numberOfViews}
							onViewProfilePhoto={onViewProfilePhoto}
							onAddFriend={onAddFriend}
							onShowFriendshipOptions={onShowFriendshipOptions}
							relationship={relationship}
							isCurrentUser={false}
							onIconPress={onIconPress}
							aboutMeText={aboutMeText}
							tabs={true}
							activeTab={activeTab}
							getText={getText}
						/>
					}
					{hasPhotos && (
						<View style={contentContainerStyle}>
							<Animated.View style={[styles.postsContainer, {transform: [{translateX: listTranslate}]}]}>
								{recentPosts.map((post: IWallPostCardProps, i) => {
									let likedByMe = false;
									if (post.likes.length > 0) {
										likedByMe = !!post.likes.find((like: ILike) => like.userId === currentUser.userId);
									}

									return (
										<View style={styles.wallPostContainer} key={post.id}>
											<WallPostCard
												{...post}
												likedByMe={likedByMe}
												canDelete={false}
												onCommentPress={() => onCommentPress(post.id, null)}
												onImagePress={(index: number) => onImagePress(index, post.media)}
												onLikeButtonPress={() => onLikePress(likedByMe, post.id)}
												noInput={true}
												currentUser={currentUser}
											/>
										</View>
									);
								})}
							</Animated.View>
							<Animated.View
								onLayout={(event: any) => {
									if (containerHeight !== event.nativeEvent.layout.height) {
										onLayoutChange(event.nativeEvent.layout.height);
									}
								}}
								style={[styles.gridContainer, {transform: [{translateX: gridTranslate}]}]}
							>
								<ProfilePhotoGrid
									loadMorePhotosHandler={loadMorePhotosHandler}
									gridMediaProvider={gridMediaProvider}
									onViewMediaFullScreen={onViewMediaFullscreen}
									header={{
										element: <View style={{width: 1, height: 1}} />,
										height: hasPhotos ? 1 : SCREEN_HEIGHT,
									}}
									disabled={hasPhotos}
								/>
							</Animated.View>
						</View>
					)}
					{!hasPhotos && <NoPhotos getText={getText} />}
				</ScrollView>
			</View>
		</WithInlineLoader>
	);
};
