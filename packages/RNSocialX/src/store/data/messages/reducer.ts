import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IMessage, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.GET_MESSAGES: {
			return state;
		}

		case ActionTypes.SYNC_GET_MESSAGES: {
			return { ...state, messages: action.payload };
		}

		case ActionTypes.SEND_MESSAGE: {
			const { alias, message } = action.payload;

			let messages: IMessage[] = [message];
			if (state.messages[alias] && state.messages[alias].length > 0) {
				messages = [...state.messages[alias], message];
			}

			return {
				...state,
				messages: {
					...state.messages,
					[alias]: messages,
				},
			};
		}

		case ActionTypes.UPDATE_MESSAGE: {
			const { id, alias, consecutive } = action.payload;

			return {
				...state,
				messages: {
					...state.messages,
					[alias]: state.messages[alias].map((message) => {
						if (message.id === id) {
							return {
								...message,
								consecutive: {
									...message.consecutive,
									...consecutive,
								},
							};
						}

						return message;
					}),
				},
			};
		}

		case ActionTypes.DELETE_MESSAGE: {
			const { id, alias } = action.payload;

			return {
				...state,
				messages: {
					...state.messages,
					[alias]: state.messages[alias].filter((message) => message.id !== id),
				},
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
