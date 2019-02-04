import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.GET_BOUNTIES: {
			return state;
		}

		case ActionTypes.SYNC_GET_BOUNTIES: {
			return { ...state, bounties: action.payload };
		}

		// case ActionTypes.UPDATE_BOUNTY: {
		// 	const { id, claimed } = action.payload;

		// 	return {
		// 		...state,
		// 		bounties: {
		// 			...state.bounties,
		// 			[alias]: state.messages[alias].map((message) => {
		// 				if (message.id === id) {
		// 					return {
		// 						...message,
		// 						consecutive: {
		// 							...message.consecutive,
		// 							...consecutive,
		// 						},
		// 					};
		// 				}

		// 				return message;
		// 			}),
		// 		},
		// 	};
		// }

		case 'RESET_STORE': {
			return initialState;
		}

		default: {
			// assertNever(action);
			return state;
		}
	}
};
