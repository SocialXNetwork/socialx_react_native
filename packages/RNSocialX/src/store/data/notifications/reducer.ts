import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_NOTIFICATION: {
			return state;
		}

		case ActionTypes.REMOVE_NOTIFICATION: {
			return state;
		}

		case ActionTypes.GET_CURRENT_NOTIFICATIONS: {
			return state;
		}

		case ActionTypes.SYNC_CURRENT_NOTIFICATIONS: {
			return state;
		}

		case ActionTypes.HOOK_NOTIFICATIONS: {
			return state;
		}

		case ActionTypes.SYNC_FRIEND_REQUESTS: {
			return {
				...state,
				friendRequests: action.payload,
			};
		}

		case ActionTypes.SYNC_FRIEND_RESPONSES: {
			return {
				...state,
				friendResponses: action.payload,
			};
		}

		case ActionTypes.MARK_NOTIFICATIONS_AS_READ: {
			const { unreadRequests, unreadResponses } = action.payload;
			const requests = { ...state.friendRequests };
			const responses = { ...state.friendResponses };

			for (const req of unreadRequests) {
				requests[req.username].read = true;
			}

			for (const res of unreadResponses) {
				responses[res.username].read = true;
			}

			return {
				friendRequests: requests,
				friendResponses: responses,
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
