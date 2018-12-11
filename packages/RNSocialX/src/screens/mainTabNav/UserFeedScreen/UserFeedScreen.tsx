import * as React from 'react';
import { AsyncStorage, Dimensions, FlatList } from 'react-native';

import { FEED_TYPES, SCREENS } from '../../../environment/consts';
import { INavigationProps } from '../../../types';

import { UserFeedScreenView } from './UserFeedScreen.view';

import {
	IWithUserFeedEnhancedActions,
	IWithUserFeedEnhancedData,
} from '../../../enhancers/screens';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const BASELINE_SCREEN_HEIGHT = 667;
const BASELINE_KEYBOARD_HEIGHT = 226;

export interface IFeedProps {
	shareMessage: string;
	feedType: FEED_TYPES;
}

type IUserFeedScreenProps = INavigationProps &
	IFeedProps &
	IWithUserFeedEnhancedData &
	IWithUserFeedEnhancedActions;

export class Screen extends React.Component<IUserFeedScreenProps> {
	private listRef: React.RefObject<FlatList<string>> = React.createRef();
	private keyboardHeight: number = 0;

	public async componentDidMount() {
		const keyboardHeight = await AsyncStorage.getItem('KEYBOARD_HEIGHT');
		this.keyboardHeight = keyboardHeight ? +keyboardHeight : BASELINE_KEYBOARD_HEIGHT;
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
				listRef={this.listRef}
				onRefresh={this.onRefreshHandler}
				onLoadMorePosts={this.onLoadMorePostsHandler}
				onCreateWallPost={this.onCreateWallPostHandler}
				onCommentInputPress={this.onCommentInputPressHandler}
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

	private onCommentInputPressHandler = (y: number, height: number, first: boolean) => {
		if (this.listRef.current) {
			this.listRef.current.scrollToOffset({
				animated: true,
				offset: this.computeScrollOffset(y, height, first),
			});
		}
	};

	private computeScrollOffset = (y: number, height: number, first: boolean) => {
		if (first && y * 3 > height) {
			return 0;
		}

		const offsetPredictor = -0.99969 * height + 346.07015;
		const screenPredictor = 0.78309 * SCREEN_HEIGHT - 526.08524;
		const keyboardHeightDifference = this.keyboardHeight - BASELINE_KEYBOARD_HEIGHT;

		if (SCREEN_HEIGHT !== BASELINE_SCREEN_HEIGHT) {
			return y - offsetPredictor - (screenPredictor - Math.abs(keyboardHeightDifference));
		} else {
			return y - offsetPredictor;
		}
	};
}
