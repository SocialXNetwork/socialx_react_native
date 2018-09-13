/**
 * TODO list:
 * 1. Props data: currentUser
 * 2. Props actions: loadPosts, likePost, unlikePost, deletePost, showActivityIndicator, hideActivityIndicator
 * 3. resetNavigationToRoute, old repo. Internals/backend/actions/navigation.ts
 * 3.1 we can do this at the top level, without navigation
 * 4. Refactor the commented part into the header component
 * 5. Implement getAvatarImage (check IPFS)
 */

import * as React from 'react';
import {Animated, Dimensions, FlatList, Platform} from 'react-native';
import {AnimatedValue, NavigationScreenProp} from 'react-navigation';

import {IWallPostCardProps} from '../../../components';
// import {ipfsConfig as base} from 'configuration';
import {OS_TYPES} from '../../../environment/consts';
import {IMediaProps, ITranslatedProps} from '../../../types';
import {SHARE_SECTION_HEIGHT, USER_PLACEHOLDER_AVATAR} from './UserFeedScreen.style';
import {UserFeedScreenView} from './UserFeedScreen.view';

const MOCK_SUGGESTED = [
	{
		userId: '101',
		name: 'test user 1',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '102',
		name: 'test user 2',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
	{
		userId: '103',
		name: 'test user 3',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '104',
		name: 'test user 4',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '105',
		name: 'test user 5',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
	{
		userId: '106',
		name: 'test user 6',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
];

const AVAILABLE_SCREEN_HEIGHT = Dimensions.get('window').height;
const TOTAL_SCREEN_HEIGHT = Dimensions.get('screen').height;
const SUGGESTIONS_POSTS_INTERVAL = 20;
let SUGGESTIONS_MULTIPLIER = 1;

export interface IFeedProps {
	shareSectionPlaceholder: string | null;
}

interface IUserFeedScreenProps extends IFeedProps, ITranslatedProps {
	currentUser: any;
	posts: any;
	hasMorePosts: boolean;
	loadPosts: () => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
	deletePost: (postId: string) => void;
	showActivityIndicator: (message: string) => void;
	hideActivityIndicator: () => void;
	navigation: NavigationScreenProp<any>;
}

interface IUserFeedScreenState {
	refreshing: boolean;
	loadingMore: boolean;
}

export class UserFeedScreen extends React.Component<IUserFeedScreenProps, IUserFeedScreenState> {
	public state = {
		refreshing: false,
		loadingMore: false,
	};

	private readonly scrollRef: React.RefObject<FlatList<IWallPostCardProps>> = React.createRef();
	private scrollY: AnimatedValue = new Animated.Value(0);

	public render() {
		const {currentUser, posts, shareSectionPlaceholder, hasMorePosts, getText} = this.props;

		// Temporary, the backend should send all the data
		if (posts && posts.length > SUGGESTIONS_MULTIPLIER * SUGGESTIONS_POSTS_INTERVAL) {
			posts.map((item: IWallPostCardProps, index: number) => {
				if (index === SUGGESTIONS_MULTIPLIER * SUGGESTIONS_POSTS_INTERVAL && !item.suggested) {
					item.suggested = MOCK_SUGGESTED;
					return item;
				}
				return item;
			});
			SUGGESTIONS_MULTIPLIER++;
		}

		const shareSectionOpacityInterpolation = this.scrollY.interpolate({
			inputRange: [0, SHARE_SECTION_HEIGHT / 2, SHARE_SECTION_HEIGHT],
			outputRange: [1, 0.3, 0],
			extrapolate: 'clamp',
		});

		return (
			<UserFeedScreenView
				avatarImage={this.getAvatarImage()}
				wallPosts={posts}
				refreshing={this.state.refreshing}
				onRefresh={this.onRefreshHandler}
				onLoadMorePosts={this.onLoadMorePostsHandler}
				onShowNewWallPostPress={this.showNewWallPostPage}
				onMediaPress={this.onMediaObjectPressHandler}
				onCommentPress={this.onCommentsButtonPressHandler}
				currentUser={currentUser}
				noPosts={posts.length === 0}
				shareSectionPlaceholder={shareSectionPlaceholder}
				onLikePress={this.onLikePressHandler}
				onPostDeletePress={this.onPostDeletePressHandler}
				onUserPress={this.gotoUserProfile}
				loadingMore={this.state.loadingMore}
				hasMorePosts={hasMorePosts}
				onAddCommentPress={this.onAddCommentPressHandler}
				shareSectionOpacityInterpolation={shareSectionOpacityInterpolation}
				scrollRef={this.scrollRef}
				scrollY={this.scrollY}
				isLoading={this.state.refreshing && this.state.loadingMore}
				getText={getText}
			/>
		);
	}

	private getAvatarImage = () => {
		// let ret = USER_PLACEHOLDER_AVATAR;
		// const {data} = this.props;
		// if (!data.loading) {
		// 	const avatarHash = data ? (data.user.avatar ? data.user.avatar.hash : null) : null;
		// 	if (avatarHash) {
		// 		ret = {uri: base.ipfs_URL + avatarHash};
		// 	}
		// }
		return USER_PLACEHOLDER_AVATAR;
	};

	private onLoadMorePostsHandler = async () => {
		if (!this.state.loadingMore) {
			this.setState(
				{
					loadingMore: true,
				},
				() => {
					this.props.loadPosts();
				},
			);
		}
	};

	private showNewWallPostPage = () => {
		const {currentUser, navigation} = this.props;
		navigation.navigate('NewWallPostScreen', {
			fullName: currentUser.fullName,
			avatarImage: this.getAvatarImage(),
			afterPostCreate: this.onRefreshHandler,
		});
	};

	private onRefreshHandler = async () => {
		if (!this.state.refreshing) {
			this.setState({refreshing: true}, () => {
				this.props.loadPosts();
			});
		}
	};

	private onLikePressHandler = async (likedByMe: boolean, postId: string) => {
		const {likePost, unlikePost} = this.props;

		if (likedByMe) {
			unlikePost(postId);
		} else {
			likePost(postId);
		}

		return !likedByMe;
	};

	private onPostDeletePressHandler = (post: IWallPostCardProps) => {
		const {deletePost, showActivityIndicator, currentUser} = this.props;
		const userOwnsPost = post.owner.userId === currentUser.userId;

		if (userOwnsPost) {
			showActivityIndicator('Removing your post...');
			deletePost(post.id);
		} else {
			// user doesnt own the post, thus cant delete, or server issues
		}
	};

	private gotoUserProfile = (userId: string) => {
		this.props.navigation.navigate('UserProfileScreen', {userId});
	};

	private onMediaObjectPressHandler = (index: number, medias: IMediaProps[]) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: medias,
			startIndex: index,
		});
	};

	private onCommentsButtonPressHandler = (postId: any, userId: any, startComment: boolean, postData: object) => {
		this.props.navigation.navigate('CommentsStack', {postId, userId, startComment, postData});
	};

	private onAddCommentPressHandler = (index: number, cardHeight: number) => {
		if (!this.state.refreshing && !this.state.loadingMore && this.scrollRef.current) {
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
