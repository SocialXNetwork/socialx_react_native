import uuid from 'uuid/v4';

import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.LOAD_COMMENTS: {
			const comments = { ...state.comments };

			for (const post of action.payload) {
				for (const comment of post.comments) {
					comments[comment.commentId] = comment;
				}
			}

			return { ...state, comments };
		}

		case ActionTypes.CREATE_COMMENT: {
			const { commentId } = action.payload;

			return {
				...state,
				comments: {
					...state.comments,
					[commentId]: action.payload,
				},
			};
		}

		case ActionTypes.CREATE_COMMENT_ERROR: {
			const {
				[action.payload]: {},
				...updatedComments
			} = state.comments;

			return {
				...state,
				comments: updatedComments,
			};
		}

		case ActionTypes.SYNC_CREATE_COMMENT: {
			const { commentId, previousCommentId } = action.payload;

			const comment = state.comments[previousCommentId];
			const {
				[previousCommentId]: {},
				...updatedComments
			} = state.comments;

			return {
				...state,
				comments: {
					...updatedComments,
					[commentId]: {
						...comment,
						commentId,
						posting: false,
					},
				},
			};
		}

		case ActionTypes.REMOVE_COMMENT: {
			return state;
		}

		case ActionTypes.SYNC_REMOVE_COMMENT: {
			const {
				[action.payload]: {},
				...updatedComments
			} = state.comments;

			return {
				...state,
				comments: updatedComments,
			};
		}

		case ActionTypes.LIKE_COMMENT: {
			const { commentId, alias, pub } = action.payload;

			const like = {
				likeId: uuid(),
				owner: {
					alias,
					pub,
				},
				timestamp: Number(new Date(Date.now())),
			};

			return {
				...state,
				comments: {
					...state.comments,
					[action.payload.commentId]: {
						...state.comments[commentId],
						likes: [...state.comments[commentId].likes, like],
					},
				},
			};
		}

		case ActionTypes.LIKE_COMMENT_ERROR: {
			const { commentId, alias } = action.payload;

			return {
				...state,
				comments: {
					...state.comments,
					[commentId]: {
						...state.comments[commentId],
						likes: state.comments[commentId].likes.filter((like) => like.owner.alias !== alias),
					},
				},
			};
		}

		case ActionTypes.UNLIKE_COMMENT: {
			const { commentId, alias } = action.payload;

			return {
				...state,
				comments: {
					...state.comments,
					[commentId]: {
						...state.comments[commentId],
						likes: state.comments[commentId].likes.filter((like) => like.owner.alias !== alias),
					},
				},
			};
		}

		case ActionTypes.UNLIKE_COMMENT_ERROR: {
			const { commentId, alias, pub } = action.payload;

			const like = {
				likeId: uuid(),
				owner: {
					alias,
					pub,
				},
				timestamp: Number(new Date(Date.now())),
			};

			return {
				...state,
				comments: {
					...state.comments,
					[action.payload.commentId]: {
						...state.comments[commentId],
						likes: [...state.comments[commentId].likes, like],
					},
				},
			};
		}

		case 'RESET_STORE': {
			return initialState;
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
