import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_ACCOUNT: {
			return state;
		}

		// TODO: @jake see this with serkan
		case ActionTypes.RECOVER_ACCOUNT: {
			return state;
		}

		case ActionTypes.CHANGE_PASSWORD: {
			return state;
		}

		case ActionTypes.LOGIN: {
			return state;
		}

		case ActionTypes.LOGOUT: {
			return state;
		}

		case ActionTypes.GET_CURRENT_ACCOUNT: {
			return state;
		}

		case ActionTypes.SYNC_GET_CURRENT_ACCOUNT: {
			return {
				accounts: [
					...state.accounts.filter(
						(account) => account.alias !== action.payload.alias,
					),
					action.payload,
				],
			};
		}

		case ActionTypes.GET_ACCOUNT_BY_PUB: {
			return state;
		}

		case ActionTypes.SYNC_GET_ACCOUNT_BY_PUB: {
			return {
				accounts: [
					...state.accounts.filter(
						(account) => account.alias !== action.payload.alias,
					),
					action.payload,
				],
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
