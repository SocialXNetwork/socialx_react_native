import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.ACTIVITY: {
			return {
				...state,
				activities: action.payload.type
					? [...state.activities, action.payload]
					: state.activities.filter(
							(activity) => action.payload.uuid !== activity.uuid,
					  ), // tslint:disable-line indent (tslint bug!!!)
			};
		}

		default: {
			// @ts-ignore
			assertNever(action);
			return state;
		}
	}
};
