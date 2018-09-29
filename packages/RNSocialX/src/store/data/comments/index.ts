import { ICommentIdInput, ICreateCommentInput } from './Types';

export { default as reducer } from './reducer';
export {
	IState,
	IAction,
	ICommentsApiData,
	ICommentIdInput,
	ICreateCommentInput,
	IPostIdInput,
} from './Types';
export {
	createComment,
	getCommentLikes,
	getPostComments,
	likeComment,
} from './actions';
