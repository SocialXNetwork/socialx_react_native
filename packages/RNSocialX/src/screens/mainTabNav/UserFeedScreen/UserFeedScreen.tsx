import * as React from 'react';
import { Animated, Dimensions, FlatList, Platform } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import { FEED_TYPES, OS_TYPES, SCREENS } from '../../../environment/consts';
import { INavigationProps, IWallPostData } from '../../../types';

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
	private readonly scrollRef: React.RefObject<FlatList<IWallPostData>> = React.createRef();
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
			navigation,
			getText,
		} = this.props;

		const likeFailed = !!errors.find(
			(error) => error.type === ActionTypes.LIKE_POST || error.type === ActionTypes.UNLIKE_POST,
		);

		return (
			<UserFeedScreenView
				posts={posts}
				avatarImage={currentUser.avatar}
				skeletonPost={skeletonPost}
				refreshing={refreshingFeed}
				creatingPost={creatingPost}
				canLoadMorePosts={canLoadMorePosts}
				loadingMorePosts={loadingMorePosts}
				shareSectionPlaceholder={shareSectionPlaceholder}
				scrollRef={this.scrollRef}
				scrollY={this.scrollY}
				likeFailed={likeFailed}
				onRefresh={this.onRefreshHandler}
				onLoadMorePosts={this.onLoadMorePostsHandler}
				onCreateWallPost={this.onCreateWallPostHandler}
				onAddComment={this.onAddCommentPressHandler}
				navigation={navigation}
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
				avatarImage: currentUser.avatar,
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
}
