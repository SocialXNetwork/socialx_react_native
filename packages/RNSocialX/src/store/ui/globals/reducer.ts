import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_GLOBAL: {
			return {
				...state,
				[Object.keys(action.payload)[0]]: Object.values(action.payload)[0],
			};
		}

		default: {
			// @ts-ignore
			assertNever(action); // typescript bug?
			return state;
		}
	}
};
