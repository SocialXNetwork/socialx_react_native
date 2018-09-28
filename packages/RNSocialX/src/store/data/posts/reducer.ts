// todo @jake implement the reducers based on gun data shape from getters

import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_POST: {
			return { ...state };
		}

		case ActionTypes.LIKE_POST: {
			return { ...state };
		}

		case ActionTypes.GET_POST_LIKES: {
			return { ...state };
		}

		case ActionTypes.GET_PUBLIC_POSTS_BY_DATE: {
			return { ...state };
		}

		case ActionTypes.GET_POST_BY_PATH: {
			return { ...state };
		}

		case ActionTypes.GET_POST_PATHS_BY_USER: {
			return { ...state };
		}

		case ActionTypes.REMOVE_POST: {
			return { ...state };
		}

		case ActionTypes.UNLIKE_POST: {
			return { ...state };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
