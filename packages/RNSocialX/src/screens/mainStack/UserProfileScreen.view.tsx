import * as React from 'react';
import {
	Animated,
	Dimensions,
	RefreshControl,
	ScrollView,
	View,
} from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';

import {
	CloseButton,
	Header,
	NoPhotos,
	ProfilePhotoGrid,
	ProfileTopContainer,
	WallPostCard,
} from '../../components';
import {
	IWithLoaderProps,
	WithInlineLoader,
} from '../../components/inlineLoader';
import { PROFILE_TAB_ICON_TYPES } from '../../environment/consts';
import {
	ICurrentUser,
	ILike,
	IWallPostCardActions,
	IWallPostCardData,
	SearchResultKind,
} from '../../types';

import styles, { colors } from './UserProfileScreen.style';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface IUserProfileScreenViewProps
	extends IWithLoaderProps,
		IWallPostCardActions {
	avatarURL: any;
	fullName: string;
	userName: false | string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFriends: number;
	numberOfComments: number;
	relationship: SearchResultKind;
	aboutMeText: string;
	recentPosts: IWallPostCardData[];
	refreshing: boolean;
	gridMediaProvider: DataProvider;
	currentUser: ICurrentUser;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
	onRefresh: () => void;
	onClose: () => void;
	onAddFriend: () => void;
	onShowFriendshipOptions: () => void;
	onViewProfilePhoto: () => void;
	loadMorePhotosHandler: () => void;
	onViewMediaFullscreen: (index: number) => void;
	onIconPress: (tab: string) => void;
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
	onLikeButtonPress,
	aboutMeText,
	numberOfComments,
	currentUser,
	onIconPress,
	listTranslate,
	gridTranslate,
	activeTab,
	containerHeight,
	onLayoutChange,
	isLoading,
	getText,
	onClose,
	onUserPress,
	onAddComment,
	onSubmitComment,
	onDeletePress,
	onBlockUser,
	onReportProblem,
}) => {
	const hasPhotos = numberOfPhotos !== 0;

	let contentContainerStyle;
	if (activeTab === PROFILE_TAB_ICON_TYPES.GRID && containerHeight !== 0) {
		contentContainerStyle =
			containerHeight < SCREEN_HEIGHT / 2
				? [styles.contentContainer, { height: SCREEN_HEIGHT / 2 }]
				: [styles.contentContainer, { height: containerHeight }];
	} else {
		contentContainerStyle = styles.contentContainer;
	}

	const scrollContainerStyles = hasPhotos
		? styles.scrollContainer
		: [styles.scrollContainer, { flex: 1 }];

	return (
		<WithInlineLoader isLoading={isLoading}>
			<View style={styles.container}>
				<Header title={'profile'} left={<CloseButton onClose={onClose} />} />
				<View style={styles.whiteBottomView} />
				<ScrollView
					contentContainerStyle={scrollContainerStyles}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor={colors.white}
						/>
					}
					scrollEnabled={hasPhotos}
				>
					<ProfileTopContainer
						avatarURL={avatarURL}
						fullName={fullName}
						userName={userName}
						numberOfFriends={numberOfFriends}
						numberOfLikes={numberOfLikes}
						numberOfPhotos={numberOfPhotos}
						numberOfComments={numberOfComments}
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
					{hasPhotos && (
						<View style={contentContainerStyle}>
							<Animated.View
								style={[
									styles.postsContainer,
									{ transform: [{ translateX: listTranslate }] },
								]}
							>
								{recentPosts.map((post: IWallPostCardData, index: number) => {
									let likedByMe = false;
									if (post.likes.length > 0) {
										likedByMe = !!post.likes.find(
											(like: ILike) => like.userId === currentUser.userId,
										);
									}

									return (
										<View style={styles.wallPostContainer} key={post.id}>
											<WallPostCard
												{...post}
												likedByMe={likedByMe}
												canDelete={false}
												getText={getText}
												onCommentPress={onCommentPress}
												onImagePress={onImagePress}
												onUserPress={onUserPress}
												/* Just for interface compatibility onAddComment dummyIndex will be 0 all the time. Read it as index from recentPosts loop. */
												onAddComment={(
													dummyIndex: number,
													cardHeight: number,
												) => onAddComment(index, cardHeight)}
												onSubmitComment={onSubmitComment}
												onLikeButtonPress={onLikeButtonPress}
												noInput={true}
												currentUserAvatarURL={currentUser.avatarURL}
												onDeletePress={onDeletePress}
												onBlockUser={onBlockUser}
												onReportProblem={onReportProblem}
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
								style={[
									styles.gridContainer,
									{ transform: [{ translateX: gridTranslate }] },
								]}
							>
								<ProfilePhotoGrid
									loadMorePhotosHandler={loadMorePhotosHandler}
									gridMediaProvider={gridMediaProvider}
									onViewMediaFullScreen={onViewMediaFullscreen}
									header={{
										element: <View style={{ width: 1, height: 1 }} />,
										height: hasPhotos ? 1 : SCREEN_HEIGHT,
									}}
									disabled={hasPhotos}
									getText={getText}
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
