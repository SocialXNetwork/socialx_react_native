import { delay } from 'lodash';
import * as React from 'react';
import { AsyncStorage, Dimensions, FlatList, Platform, View } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { withNavigation } from 'react-navigation';

import { FEED_TYPES, OS_TYPES, SCREENS } from '../../../environment/consts';
import { INavigationProps } from '../../../types';

import { FeedListView } from './FeedList.view';

import { IWithFeedEnhancedActions, IWithFeedEnhancedData } from '../../../enhancers/screens';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const BASELINE_SCREEN_HEIGHT = 667;
const BASELINE_KEYBOARD_HEIGHT = 226;

export interface IFeedProps {
	shareMessage: string;
	feedType: FEED_TYPES;
}

type IProps = INavigationProps & IFeedProps & IWithFeedEnhancedData & IWithFeedEnhancedActions;

interface IState {
	loaded: boolean;
	scrollY: number;
}

export class FeedList extends React.Component<IProps, IState> {
	public state = {
		loaded: false,
		scrollY: 0,
	};

	private listRef: React.RefObject<FlatList<string>> = React.createRef();
	private postContainerRef: React.RefObject<View> = React.createRef();
	private keyboardHeight: number = 0;

	public async componentDidMount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustNothing();
		}

		const keyboardHeight = await AsyncStorage.getItem('KEYBOARD_HEIGHT');
		this.keyboardHeight = keyboardHeight ? +keyboardHeight : BASELINE_KEYBOARD_HEIGHT;

		delay(() => {
			if (!this.state.loaded) {
				this.setState({ loaded: true });
			}
		}, 200);
	}

	public render() {
		const {
			currentUser,
			postIds,
			shareMessage,
			canLoadMore,
			refreshingFeed,
			loadingMorePosts,
			navigation,
			getText,
		} = this.props;

		return (
			<FeedListView
				postIds={postIds}
				avatar={currentUser.avatar}
				refreshing={refreshingFeed}
				canLoadMorePosts={canLoadMore}
				loadingMorePosts={loadingMorePosts}
				shareMessage={shareMessage}
				listRef={this.listRef}
				postContainerRef={this.postContainerRef}
				loaded={this.state.loaded}
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
		const offsetPredictor = -0.99969 * height + 346.07015;
		const iosScreenPredictor = 0.82685 * SCREEN_HEIGHT - 563.20304;
		const androidScreenPredictor = 0.70444 * SCREEN_HEIGHT - 561.82132;
		const keyboardHeightDifference = this.keyboardHeight - BASELINE_KEYBOARD_HEIGHT;

		const iosOffset =
			SCREEN_HEIGHT !== BASELINE_SCREEN_HEIGHT
				? y - offsetPredictor - (iosScreenPredictor - Math.abs(keyboardHeightDifference))
				: y - offsetPredictor;

		const androidOffset =
			SCREEN_HEIGHT !== BASELINE_SCREEN_HEIGHT
				? y - offsetPredictor - (androidScreenPredictor + Math.abs(keyboardHeightDifference))
				: y - offsetPredictor;

		const offset = Platform.OS === OS_TYPES.Android ? androidOffset : iosOffset;
		if (first && offset < 0) {
			return 0;
		}

		return offset;
	};
}
