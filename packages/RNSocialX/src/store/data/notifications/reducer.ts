import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		// since refetching for a single data change is inefficient
		// should we update the list here too?
		case ActionTypes.CREATE_NOTIFICATION: {
			return { ...state };
		}

		// should we update the list here too?
		case ActionTypes.REMOVE_NOTIFICATION: {
			return { ...state };
		}

		case ActionTypes.CURRENT_NOTIFICATION: {
			const notifications = action.payload;
			return { ...state, notifications };
		}

		case ActionTypes.NOTIFICATION_BY_ID: {
			const { notification } = action.payload;
			return { ...state, notification };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
