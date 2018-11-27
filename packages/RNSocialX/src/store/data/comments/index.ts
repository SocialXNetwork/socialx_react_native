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
} from './Types';

export {
	ICreatePostInput,
	IPostArrayData,
	IPostReturnData,
	IRemovePostInput,
	IUnlikePostInput,
	ICommentsReturnData,
	ILikeData,
} from '@socialx/api-data';

export {
	createComment,
	removeComment,
	likeComment,
	unlikeComment,
	loadCommentsAction,
} from './actions';
