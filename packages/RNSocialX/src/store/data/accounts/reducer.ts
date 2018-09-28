// todo @jake implement the reducers based on gun data shape from getters

import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_ACCOUNT: {
			return { ...state };
		}

		case ActionTypes.RECOVER_ACCOUNT: {
			const recovery = action.payload;
			return { ...state, recovery };
		}

		case ActionTypes.CHANGE_PASSWORD: {
			return { ...state };
		}

		case ActionTypes.TRUST_ACCOUNT: {
			return { ...state };
		}

		case ActionTypes.LOGIN: {
			return { ...state, loggedIn: true };
		}

		case ActionTypes.LOGOUT: {
			return { ...state, loggedIn: false };
		}

		// guess this can be used as an extra check?
		case ActionTypes.GET_IS_ACCOUNT_LOGGED_IN: {
			const loggedIn = action.payload;
			return { ...state, loggedIn };
		}

		case ActionTypes.GET_CURRENT_ACCOUNT: {
			const currentAccount = action.payload;
			return { ...state, currentAccount };
		}

		case ActionTypes.GET_ACCOUNT_BY_PUB: {
			const { account } = action.payload;
			return { ...state, account };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
