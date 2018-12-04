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
	loadMorePosts,
	loadMoreFriendsPosts,
	getPostByPath,
	getPostById,
	getUserPosts,
	createPost,
	likePost,
	removePost,
	unlikePost,
	syncAddCommentAction,
	syncRemoveCommentAction,
	resetPostsAndRefetch,
} from './actions';
