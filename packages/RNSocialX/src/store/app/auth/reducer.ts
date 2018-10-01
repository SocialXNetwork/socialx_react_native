import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_AUTH: {
			return {
				...state,
				auth: action.payload,
			};
		}

		default: {
			// @ts-ignore // TODO: @Serkan better option to use `action as never` ?
			assertNever(action);
			return state;
		}
	}
};
