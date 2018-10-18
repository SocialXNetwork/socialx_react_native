import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.ACTIVITY: {
			const currentActivity = state.activities.find(
				(activity) => activity.uuid === action.payload.uuid,
			);
			return {
				...state,
				activities: [
					...state.activities.filter(
						(activity) => activity.uuid !== action.payload.uuid,
					),
					action.payload,
				],
			};
		}

		case ActionTypes.ERROR: {
			return {
				...state,
				errors: action.payload.type
					? [...state.errors, action.payload]
					: state.errors.filter((error) => action.payload.uuid !== error.uuid),
			};
		}

		case 'RESET_STORE': {
			return state;
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
