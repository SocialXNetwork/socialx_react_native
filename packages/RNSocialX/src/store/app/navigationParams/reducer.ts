import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_NAVIGATION_PARAMS: {
			return {
				...state,
				[action.payload.screenName]: action.payload.params,
			};
		}

		default: {
			// @ts-ignore
			assertNever(action); // typescript bug?
			return state;
		}
	}
};
