// todo @jake

import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_NOTIFICATION: {
			return { ...state };
		}

		default: {
			// @ts-ignore
			assertNever(action); // typescript bug when there's only 1 case?
			return state;
		}
	}
};
