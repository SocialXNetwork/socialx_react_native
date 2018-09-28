// todo @jake implement the reducers based on gun data shape from getters

import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_PROFILE: {
			return { ...state };
		}

		case ActionTypes.GET_CURRENT_PROFILE: {
			return { ...state };
		}

		case ActionTypes.GET_PROFILE_BY_USERNAME: {
			return { ...state };
		}

		case ActionTypes.GET_PUBLIC_KEY_BY_USERNAME: {
			return { ...state };
		}

		case ActionTypes.UPDATE_PROFILE: {
			return { ...state };
		}

		case ActionTypes.ADD_FRIEND: {
			return { ...state };
		}

		case ActionTypes.REMOVE_FRIEND: {
			return { ...state };
		}

		case ActionTypes.ACCEPT_FRIEND: {
			return { ...state };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
