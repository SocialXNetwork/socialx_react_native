import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.GET_USER_EVENTS: {
			return state;
		}

		case ActionTypes.SYNC_GET_USER_EVENTS: {
			const { owner, notifications } = action.payload;
			return {
				...state,
				notifications: {
					[owner]: notifications,
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
