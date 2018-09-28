import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_NOTIFICATION: {
			return { ...state };
		}

		case ActionTypes.REMOVE_NOTIFICATION: {
			return { ...state };
		}

		case ActionTypes.CURRENT_NOTIFICATION: {
			return { ...state };
		}

		case ActionTypes.NOTIFICATION_BY_ID: {
			return { ...state };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
