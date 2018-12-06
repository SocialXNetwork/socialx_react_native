export { default as reducer } from './reducer';

export {
	IState,
	IAction,
	ICreateCommentInput,
	IRemoveCommentInput,
	ILikeCommentInput,
	IUnlikeCommentErrorAction,
	ICreateCommentErrorAction,
	IRemoveCommentErrorAction,
	IComment,
	IComments,
} from './Types';

export { ICreatePostInput, IRemovePostInput, IUnlikePostInput, ILikeData } from '@socialx/api-data';

export {
	createComment,
	removeComment,
	likeComment,
	unlikeComment,
	loadCommentsAction,
} from './actions';
