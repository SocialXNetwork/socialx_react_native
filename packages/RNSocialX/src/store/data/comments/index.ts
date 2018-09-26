import {ICommentIdArgument, ICreateCommentInput} from './Types';

export {default as reducer} from './reducer';
export {IState, IAction, ICommentData, ICommentIdArgument, ICreateCommentInput, IPostIdArgument} from './Types';
export {commentLikes, createComment, postComments, likeComment} from './actions';
