// todo @jake implement the reducers based on gun data shape from getters

import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_ACCOUNT: {
			return { ...state };
		}

		// TODO: @jake see this with serkan
		case ActionTypes.RECOVER_ACCOUNT: {
			return { ...state };
		}

		case ActionTypes.CHANGE_PASSWORD: {
			return { ...state };
		}

		case ActionTypes.TRUST_ACCOUNT: {
			return { ...state };
		}

		case ActionTypes.LOGIN: {
			return { ...state };
		}

		case ActionTypes.LOGOUT: {
			return { ...state };
		}

		case ActionTypes.GET_IS_ACCOUNT_LOGGED_IN: {
			return { ...state };
		}

		case ActionTypes.GET_CURRENT_ACCOUNT: {
			return { ...state };
		}

		// TODO: @jake see this with serkan
		case ActionTypes.SYNC_GET_CURRENT_ACCOUNT: {
			const account = action.payload;
			return { ...state, accounts: [...state.accounts, account] };
		}

		case ActionTypes.GET_ACCOUNT_BY_PUB: {
			return { ...state };
		}

		// TODO: @jake see this with serkan
		case ActionTypes.SYNC_GET_ACCOUNT_BY_PUB: {
			const account = action.payload;
			return { ...state, accounts: [...state.accounts, account] };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
