import * as React from 'react';
import {
	ActivityIndicator,
	Animated,
	Dimensions,
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
	WallPostCard,
} from '../../components';
import { PROFILE_TAB_ICON_TYPES } from '../../environment/consts';
import { IWallPostCardActions, IWallPostCardData, SearchResultKind } from '../../types';

import styles, { colors } from './UserProfileScreen.style';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface IUserProfileScreenViewProps extends IWallPostCardActions {
	avatarURL: string;
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
	currentUserAvatarURL: string;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
	loadingPosts: boolean;
	onRefresh: () => void;
	onGoBack: () => void;
	onAddFriend: () => void;
	onShowFriendshipOptions: () => void;
	onProfilePhotoPress: () => void;
	onLoadMorePhotos: () => void;
	onViewMediaFullscreen: (index: number) => void;
	onIconPress: (tab: string) => void;
	onLayoutChange: (height: number) => void;
}

export const UserProfileScreenView: React.SFC<IUserProfileScreenViewProps> = ({
	refreshing,
	loadingPosts,
	gridMediaProvider,
	avatarURL,
	fullName,
	userName = false,
	numberOfPhotos,
	onAddFriend,
	numberOfLikes,
	numberOfFriends,
	relationship,
	onRefresh,
	recentPosts,
	aboutMeText,
	numberOfComments,
	currentUserAvatarURL,
	listTranslate,
	gridTranslate,
	activeTab,
	containerHeight,
	onShowFriendshipOptions,
	onProfilePhotoPress,
	onViewMediaFullscreen,
	onLoadMorePhotos,
	onCommentPress,
	onImagePress,
	onLikePress,
	onIconPress,
	onLayoutChange,
	onGoBack,
	onUserPress,
	onAddComment,
	onSubmitComment,
	onDeletePostPress,
	onBlockUser,
	onReportProblem,
	getText,
}) => {
	const hasPhotos = numberOfPhotos > 0;
	const hasPosts = recentPosts.length > 0;

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
					avatarURL={avatarURL}
					fullName={fullName}
					userName={userName}
					numberOfFriends={numberOfFriends}
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					numberOfComments={numberOfComments}
					onProfilePhotoPress={onProfilePhotoPress}
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
				{loadingPosts ? (
					<View style={styles.loading}>
						<ActivityIndicator size="large" />
					</View>
				) : (
					<View style={contentContainerStyle}>
						<Animated.View
							style={[styles.postsContainer, { transform: [{ translateX: listTranslate }] }]}
						>
							{hasPosts ? (
								recentPosts.map((post: IWallPostCardData, index: number) => (
									<View style={styles.wallPostContainer} key={post.postId}>
										<WallPostCard
											{...post}
											likedByMe={post.likedByMe}
											displayDots={false}
											noInput={true}
											canDelete={false}
											onCommentPress={onCommentPress}
											onImagePress={onImagePress}
											onUserPress={onUserPress}
											/* Just for interface compatibility onAddComment dummyIndex will be 0 all the time. Read it as index from recentPosts loop. */
											onAddComment={(dummyIndex: number, cardHeight: number) =>
												onAddComment(index, cardHeight)
											}
											onSubmitComment={onSubmitComment}
											onLikePress={onLikePress}
											currentUserAvatarURL={currentUserAvatarURL}
											onDeletePostPress={() => undefined}
											onBlockUser={onBlockUser}
											onReportProblem={onReportProblem}
											showDotsMenuModal={() => undefined}
											getText={getText}
										/>
									</View>
								))
							) : (
								<NoContent posts={true} getText={getText} />
							)}
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
									dataProvider={gridMediaProvider}
									onViewMediaFullScreen={onViewMediaFullscreen}
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
