import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_ACCOUNT: {
			return { ...state };
		}

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

		default: {
			assertNever(action);
			return state;
		}
	}
};
