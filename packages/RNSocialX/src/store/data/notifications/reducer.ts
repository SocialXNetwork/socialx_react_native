import { NOTIFICATION_TYPES } from '../../../environment/consts';
import { assertNever } from '../../helpers';
import { FriendResponses } from './';
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

		case ActionTypes.GET_NOTIFICATIONS: {
			return state;
		}

		case ActionTypes.SYNC_NOTIFICATIONS: {
			const all = { ...state.all };
			const unread = [...state.unread];
			const ids = [...state.ids];

			for (const key of Object.keys(action.payload)) {
				const current = action.payload[key];

				if (!all[key]) {
					all[current.id] = {
						...current,
						type:
							current.type === FriendResponses.Accepted
								? NOTIFICATION_TYPES.FRIEND_RESPONSE_ACCEPTED
								: current.type === FriendResponses.Rejected
								? NOTIFICATION_TYPES.FRIEND_RESPONSE_DECLINED
								: NOTIFICATION_TYPES.FRIEND_REQUEST,
					};
				}

				if (!action.payload[key].read) {
					unread.push(action.payload[key].id);
				}

				if (ids.indexOf(action.payload[key].id) === -1) {
					ids.push(action.payload[key].id);
				}
			}

			ids.sort((x, y) => all[y].timestamp - all[x].timestamp);

			return {
				all,
				ids,
				unread,
			};
		}

		case ActionTypes.HOOK_NOTIFICATIONS: {
			return state;
		}

		case ActionTypes.MARK_NOTIFICATIONS_AS_READ: {
			const all = { ...state.all };

			for (const id of state.unread) {
				all[id] = {
					...all[id],
					read: true,
				};
			}

			return {
				...state,
				all,
				unread: [],
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
