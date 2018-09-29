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

		case ActionTypes.GET_CURRENT_NOTIFICATIONS: {
			return { ...state };
		}

		case ActionTypes.SYNC_CURRENT_NOTIFICATIONS: {
			const notifications = action.payload;
			return { ...state, notifications };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
