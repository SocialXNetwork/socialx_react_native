import * as React from 'react';
import { Animated, Dimensions, FlatList, Platform } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import { FEED_TYPES, OS_TYPES, SCREENS, TABS } from '../../../environment/consts';
import { IMediaProps, INavigationProps, IWallPostCardData } from '../../../types';

import { UserFeedScreenView } from './UserFeedScreen.view';

import {
	IWithUserFeedEnhancedActions,
	IWithUserFeedEnhancedData,
} from '../../../enhancers/screens';
import { ActionTypes } from '../../../store/data/posts/Types';

const AVAILABLE_SCREEN_HEIGHT = Dimensions.get('window').height;
const TOTAL_SCREEN_HEIGHT = Dimensions.get('screen').height;

export interface IFeedProps {
	shareSectionPlaceholder: string;
	feedType: FEED_TYPES;
}

interface IUserFeedScreenState {}

type IUserFeedScreenProps = INavigationProps &
	IFeedProps &
	IWithUserFeedEnhancedData &
	IWithUserFeedEnhancedActions;

export class Screen extends React.Component<IUserFeedScreenProps, IUserFeedScreenState> {
	private readonly scrollRef: React.RefObject<FlatList<IWallPostCardData>> = React.createRef();
	private scrollY: AnimatedValue = new Animated.Value(0);

	public render() {
		const {
			currentUser,
			posts,
			skeletonPost,
			shareSectionPlaceholder,
			canLoadMorePosts,
			refreshingFeed,
			loadingMorePosts,
			creatingPost,
			errors,
			blockUser,
			reportProblem,
			showDotsMenuModal,
			getText,
		} = this.props;

		const likeError = !!errors.find(
			(error) => error.type === ActionTypes.LIKE_POST || error.type === ActionTypes.UNLIKE_POST,
		);

		return (
			<UserFeedScreenView
				avatarImage={currentUser.avatarURL}
				posts={posts}
				skeletonPost={skeletonPost}
				likeError={likeError}
				currentUser={currentUser}
				refreshing={refreshingFeed}
				creatingPost={creatingPost}
				onRefresh={this.onRefreshHandler}
				canLoadMorePosts={canLoadMorePosts}
				loadingMorePosts={loadingMorePosts}
				onLoadMorePosts={this.onLoadMorePostsHandler}
				onCreateWallPost={this.onCreateWallPostHandler}
				shareSectionPlaceholder={shareSectionPlaceholder}
				onImagePress={this.onImagePress}
				onLikePress={this.onLikePressHandler}
				onUserPress={this.onUserPressHandler}
				onSubmitComment={this.onSubmitCommentHandler}
				onCommentPress={this.onCommentsButtonPressHandler}
				onAddComment={this.onAddCommentPressHandler}
				onDeletePostPress={this.onDeletePostPressHandler}
				onBlockUser={blockUser}
				onReportProblem={reportProblem}
				scrollRef={this.scrollRef}
				scrollY={this.scrollY}
				showDotsMenuModal={showDotsMenuModal}
				getText={getText}
			/>
		);
	}

	private onLoadMorePostsHandler = async () => {
		const { loadMorePosts } = this.props;

		if (!this.props.loadingMorePosts && !this.props.refreshingFeed) {
			await loadMorePosts();
		}
	};

	private onCreateWallPostHandler = () => {
		const { currentUser, navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.CreateWallPost,
			params: {
				fullName: currentUser.fullName,
				avatarImage: currentUser.avatarURL,
				afterPostCreate: this.onRefreshHandler,
			},
		});
		navigation.navigate(SCREENS.CreateWallPost);
	};

	private onRefreshHandler = async () => {
		const { refreshFeed, feedType } = this.props;

		if (!this.props.refreshingFeed && !this.props.loadingMorePosts) {
			await refreshFeed(feedType);
		}
	};

	private onLikePressHandler = async (likedByMe: boolean, postId: string) => {
		const { likePost, unlikePost } = this.props;

		if (likedByMe) {
			await unlikePost(postId);
		} else {
			await likePost(postId);
		}
	};

	private onUserPressHandler = (userId: string) => {
		const { navigation, setNavigationParams, currentUser, userPosts, getPostsForUser } = this.props;

		if (userId === currentUser.userId) {
			navigation.navigate(SCREENS.MyProfile);
		} else {
			if (!userPosts[userId]) {
				getPostsForUser(userId);
			}

			setNavigationParams({
				screenName: SCREENS.UserProfile,
				params: { userId, origin: TABS.Feed },
			});
			navigation.navigate(SCREENS.UserProfile);
		}
	};

	private onImagePress = (index: number, medias: IMediaProps[], postId: string) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				mediaObjects: medias,
				startIndex: index,
				postId,
			},
		});
		navigation.navigate(SCREENS.MediaViewer);
	};

	private onCommentsButtonPressHandler = (postId: string, startComment: boolean) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.Comments,
			params: { postId, startComment },
		});
		navigation.navigate(SCREENS.Comments);
	};

	private onAddCommentPressHandler = (index: number, cardHeight: number) => {
		if (!this.props.refreshingFeed && !this.props.loadingMorePosts && this.scrollRef.current) {
			this.scrollRef.current.scrollToIndex({
				animated: true,
				index,
				viewOffset: this.calculateScrollOffset(cardHeight, index),
				viewPosition: 0,
			});
		}
	};

	private onSubmitCommentHandler = async (escapedComment: string, postId: string) => {
		if (!this.props.refreshingFeed && !this.props.loadingMorePosts) {
			await this.props.postComment(escapedComment, postId);
		}
	};

	private calculateScrollOffset = (cardHeight: number, index: number) => {
		const baseScreenHeight = 667;
		let idealOffset;
		let idealCardHeight;
		let diff;
		if (AVAILABLE_SCREEN_HEIGHT >= 667) {
			if (index === 0 && cardHeight < 300) {
				return 0;
			}

			idealOffset = 235;
			idealCardHeight = 490;
			diff = idealCardHeight - cardHeight;
		} else {
			idealOffset = 265;
			idealCardHeight = 480;
			diff = idealCardHeight - cardHeight;
		}
		const offset = (baseScreenHeight * idealOffset) / AVAILABLE_SCREEN_HEIGHT;

		if (Platform.OS === OS_TYPES.Android) {
			const softwareButtonsBarHeight = TOTAL_SCREEN_HEIGHT - AVAILABLE_SCREEN_HEIGHT;
			return -(offset - diff + softwareButtonsBarHeight);
		}

		return -(offset - diff);
	};

	private onDeletePostPressHandler = async (postId: string) => {
		const { setGlobal, deletePost } = this.props;
		setGlobal({
			transparentOverlay: {
				visible: true,
				alpha: 0.5,
				loader: true,
			},
		});
		await deletePost(postId);
		setGlobal({
			transparentOverlay: {
				visible: false,
			},
		});
	};
}
