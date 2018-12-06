import * as React from 'react';
import { Dimensions, Platform } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import { FEED_TYPES, OS_TYPES, SCREENS } from '../../../environment/consts';
import { INavigationProps } from '../../../types';

import { UserFeedScreenView } from './UserFeedScreen.view';

import {
	IWithUserFeedEnhancedActions,
	IWithUserFeedEnhancedData,
} from '../../../enhancers/screens';

export interface IFeedProps {
	shareMessage: string;
	feedType: FEED_TYPES;
}

type IUserFeedScreenProps = INavigationProps &
	IFeedProps &
	IWithUserFeedEnhancedData &
	IWithUserFeedEnhancedActions;

export class Screen extends React.Component<IUserFeedScreenProps> {
	public componentDidMount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		const {
			currentUser,
			postIds,
			placeholderPost,
			shareMessage,
			canLoadMore,
			refreshingFeed,
			loadingMorePosts,
			navigation,
			getText,
		} = this.props;

		return (
			<UserFeedScreenView
				postIds={postIds}
				placeholderPostId={placeholderPost ? placeholderPost.postId : null}
				avatar={currentUser.avatar}
				refreshing={refreshingFeed}
				canLoadMorePosts={canLoadMore}
				loadingMorePosts={loadingMorePosts}
				shareMessage={shareMessage}
				onRefresh={this.onRefreshHandler}
				onLoadMorePosts={this.onLoadMorePostsHandler}
				onCreateWallPost={this.onCreateWallPostHandler}
				navigation={navigation}
				getText={getText}
			/>
		);
	}

	private onLoadMorePostsHandler = async () => {
		const { refreshingFeed, loadingMorePosts, loadMorePosts } = this.props;

		if (!loadingMorePosts && !refreshingFeed) {
			await loadMorePosts();
		}
	};

	private onRefreshHandler = async () => {
		const { refreshingFeed, loadingMorePosts, refreshFeed } = this.props;

		if (!refreshingFeed && !loadingMorePosts) {
			await refreshFeed();
		}
	};

	private onCreateWallPostHandler = () => {
		const { currentUser, navigation, setNavigationParams } = this.props;

		setNavigationParams({
			screenName: SCREENS.CreateWallPost,
			params: {
				fullName: currentUser.fullName,
				avatarImage: currentUser.avatar,
			},
		});
		navigation.navigate(SCREENS.CreateWallPost);
	};
}
