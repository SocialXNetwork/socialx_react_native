// todo @jake implement the reducers based on gun data shape from getters

import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		// since refetching for a single data change is inefficient
		// should we update the list here too?
		case ActionTypes.CREATE_COMMENT: {
			return { ...state };
		}

		// should we update the list here too?
		case ActionTypes.LIKE_COMMENT: {
			return { ...state };
		}

		case ActionTypes.GET_COMMENT_LIKES: {
			const { likes: commentLikes } = action.payload;
			return { ...state, commentLikes };
		}

		case ActionTypes.GET_POST_COMMENTS: {
			const { comments } = action.payload;
			return { ...state, comments };
		}

		// should we update the list here too?
		case ActionTypes.REMOVE_COMMENT: {
			return { ...state };
		}
		// should we update the list here too?
		case ActionTypes.UNLIKE_COMMENT: {
			return { ...state };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
