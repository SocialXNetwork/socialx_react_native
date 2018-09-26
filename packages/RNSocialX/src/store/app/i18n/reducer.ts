import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_LOCALE: {
			return {
				...state,
				currentLocale: action.payload.locale,
			};
		}

		default: {
			// @ts-ignore
			assertNever(action); // typescript bug?
			return state;
		}
	}
};
