import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_GLOBAL: {
			const global: { [key: string]: any } = {};
			Object.keys(action.payload).map((key) => (global[key] = action.payload[key]));
			return { ...state, ...global };
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
