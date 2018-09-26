import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_PROFILE: {
			return { ...state };
		}

		case ActionTypes.GET_CURRENT_PROFILE: {
			return { ...state };
		}

		case ActionTypes.GET_PROFILE_BY_USERNAME: {
			return { ...state };
		}

		case ActionTypes.GET_PUBLIC_KEY_BY_USERNAME: {
			return { ...state };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
