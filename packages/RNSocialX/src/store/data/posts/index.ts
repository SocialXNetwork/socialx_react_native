export { default as reducer } from './reducer';

export {
	IState,
	IAction,
	IProfile,
	IPostIdInput,
	IPostPathInput,
	IPost,
	IPostLikeInput,
} from './Types';

export {
	IRemoveCommentInput,
	IRemovePostInput,
	IUnlikeCommentInput,
	IUnlikePostInput,
	ICreatePostInput,
} from '@socialx/api-data';

export {
	getPostByPath,
	refreshGlobalPosts,
	loadMorePosts,
	loadMoreFriendsPosts,
	getPostById,
	getUserPosts,
	createPost,
	likePost,
	refreshFriendsPosts,
	removePost,
	unlikePost,
	syncAddCommentAction,
	syncRemoveCommentAction,
} from './actions';
