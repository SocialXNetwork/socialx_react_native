import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_NAVIGATION_PARAMS: {
			const { screenName, params, key } = action.payload;

			if (key) {
				return {
					...state,
					[screenName]: {
						...state[screenName],
						[key]: params,
					},
				};
			}

			return {
				...state,
				[screenName]: params,
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
