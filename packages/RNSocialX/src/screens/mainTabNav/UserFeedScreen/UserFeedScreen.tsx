/**
 * TODO list:
 * 1. resetNavigationToRoute, old repo. Internals/backend/actions/navigation.ts
 * 1.1 we can do this at the top level, without navigation
 */

import * as React from 'react';
import { Animated, Dimensions, FlatList, Platform } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import {
	IWithUserFeedEnhancedActions,
	IWithUserFeedEnhancedData,
} from '../../../enhancers/screens';

import { FEED_TYPES, OS_TYPES, SCREENS } from '../../../environment/consts';
import {
	IMediaProps,
	INavigationProps,
	IWallPostCardData,
} from '../../../types';
import { SHARE_SECTION_HEIGHT } from './UserFeedScreen.style';
import { UserFeedScreenView } from './UserFeedScreen.view';

const AVAILABLE_SCREEN_HEIGHT = Dimensions.get('window').height;
const TOTAL_SCREEN_HEIGHT = Dimensions.get('screen').height;

export interface IFeedProps {
	shareSectionPlaceholder: string | null;
	feedType: FEED_TYPES;
}

interface IUserFeedScreenState {}

type IUserFeedScreenProps = INavigationProps &
	IFeedProps &
	IWithUserFeedEnhancedData &
	IWithUserFeedEnhancedActions;

export class Screen extends React.Component<
	IUserFeedScreenProps,
	IUserFeedScreenState
> {
	private readonly scrollRef: React.RefObject<
		FlatList<IWallPostCardData>
	> = React.createRef();
	private scrollY: AnimatedValue = new Animated.Value(0);

	public render() {
		const {
			currentUser,
			posts,
			shareSectionPlaceholder,
			hasMorePosts,
			refreshingFeed,
			loadingMorePosts,
			deletePost,
			blockUser,
			reportProblem,
			getText,
		} = this.props;

		const shareSectionOpacityInterpolation = this.scrollY.interpolate({
			inputRange: [0, SHARE_SECTION_HEIGHT / 2, SHARE_SECTION_HEIGHT],
			outputRange: [1, 0.3, 0],
			extrapolate: 'clamp',
		});

		return (
			<UserFeedScreenView
				avatarImage={currentUser ? currentUser.avatarURL : ''}
				wallPosts={posts}
				refreshing={refreshingFeed}
				onRefresh={this.onRefreshHandler}
				hasMorePosts={hasMorePosts}
				loadingMorePosts={loadingMorePosts}
				onLoadMorePosts={this.onLoadMorePostsHandler}
				onCreateWallPost={this.onCreateWallPostHandler}
				currentUser={currentUser}
				noPosts={posts.length === 0}
				shareSectionPlaceholder={shareSectionPlaceholder}
				shareSectionOpacityInterpolation={shareSectionOpacityInterpolation}
				onImagePress={this.onMediaObjectPressHandler}
				onLikeButtonPress={this.onLikePressHandler}
				onUserPress={this.onUserPressHandler}
				onSubmitComment={this.onSubmitCommentHandler}
				onCommentPress={this.onCommentsButtonPressHandler}
				onAddComment={this.onAddCommentPressHandler}
				onDeletePress={deletePost}
				onBlockUser={blockUser}
				onReportProblem={reportProblem}
				scrollRef={this.scrollRef}
				scrollY={this.scrollY}
				getText={getText}
			/>
		);
	}

	private onLoadMorePostsHandler = async () => {
		const { loadMorePosts } = this.props;

		// if (!this.props.loadingMorePosts && !this.props.refreshingFeed) {
		// 	loadMorePosts();
		// }
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

		// if (!this.props.refreshingFeed && !this.props.loadingMorePosts) {
		// 	refreshFeed(feedType);
		// }
	};

	private onLikePressHandler = (likedByMe: boolean, postId: string) => {
		const { likePost, unlikePost } = this.props;

		if (likedByMe) {
			unlikePost(postId);
		} else {
			likePost(postId);
		}

		return !likedByMe;
	};

	private onUserPressHandler = (userId: string) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.UserProfile,
			params: { userId },
		});
		navigation.navigate(SCREENS.UserProfile);
	};

	private onMediaObjectPressHandler = (
		index: number,
		medias: IMediaProps[],
		postId: string,
	) => {
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

	private onCommentsButtonPressHandler = (
		postId: string,
		startComment: boolean,
	) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.Comments,
			params: { postId, startComment },
		});
		navigation.navigate(SCREENS.Comments);
	};

	private onAddCommentPressHandler = (index: number, cardHeight: number) => {
		if (
			!this.props.refreshingFeed &&
			!this.props.loadingMorePosts &&
			this.scrollRef.current
		) {
			this.scrollRef.current.scrollToIndex({
				animated: true,
				index,
				viewOffset: this.calculateScrollOffset(cardHeight, index),
				viewPosition: 0,
			});
		}
	};

	private onSubmitCommentHandler = (escapedComment: string, postId: string) => {
		this.props.postComment(escapedComment, postId);
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
			const softwareButtonsBarHeight =
				TOTAL_SCREEN_HEIGHT - AVAILABLE_SCREEN_HEIGHT;
			return -(offset - diff + softwareButtonsBarHeight);
		}

		return -(offset - diff);
	};
}
