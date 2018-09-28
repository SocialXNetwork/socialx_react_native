// todo @jake implement the reducers based on gun data shape from getters

import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_COMMENT: {
			return { ...state };
		}

		case ActionTypes.LIKE_COMMENT: {
			return { ...state };
		}

		case ActionTypes.GET_COMMENT_LIKES: {
			return { ...state };
		}

		case ActionTypes.GET_POST_COMMENTS: {
			return { ...state };
		}

		case ActionTypes.REMOVE_COMMENT: {
			return { ...state };
		}

		case ActionTypes.UNLIKE_COMMENT: {
			return { ...state };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
