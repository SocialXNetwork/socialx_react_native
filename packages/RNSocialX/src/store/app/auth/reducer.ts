import {assertNever} from '../../helpers';
import initialState from './initialState';
import {ActionTypes, IAction, IState} from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.REGISTER: {
			return {...state};
		}

		case ActionTypes.LOGIN: {
			return {...state};
		}

		case ActionTypes.LOGOUT: {
			return {...state, currentUser: null};
		}

		case ActionTypes.RESET_PASSWORD: {
			return {...state};
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
