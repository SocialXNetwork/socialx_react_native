export { default as reducer } from './reducer';

export {
	IState,
	IAction,
	IProfile,
	IPostIdInput,
	IPostPathInput,
	IUsernameInput,
	IDateInput,
	ICommentIdInput,
	ICreateCommentInput,
} from './Types';

export {
	ICreatePostInput,
	IPostArrayData,
	IRemoveCommentInput,
	IRemovePostInput,
	IUnlikeCommentInput,
	IUnlikePostInput,
} from '@socialx/api-data';

export {
	getPostByPath,
	getPostsByUsername,
	getPublicPostsByDate,
	loadMorePosts,
	createPost,
	likePost,
	removePost,
	unlikePost,
	// comments
	createComment,
	removeComment,
	likeComment,
	unlikeComment,
} from './actions';
