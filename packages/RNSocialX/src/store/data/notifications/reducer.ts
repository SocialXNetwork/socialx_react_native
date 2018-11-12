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
			const updatedRequests = action.payload.reduce(
				(requests, newRequest) => [
					...requests.filter((oldRequest) => oldRequest.owner !== newRequest.owner),
					newRequest,
				],
				[...state.friendRequests],
			);
			return {
				...state,
				friendRequests: updatedRequests,
			};
		}

		case ActionTypes.SYNC_FRIEND_RESPONSES: {
			const updatedResponses = action.payload.reduce(
				(responses, newResponse) => [
					...responses.filter((oldResponse) => oldResponse.owner !== newResponse.owner),
					newResponse,
				],
				[...state.friendResponses],
			);
			return {
				...state,
				friendResponses: updatedResponses,
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
