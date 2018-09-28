import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_UPLOAD_PROGRESS: {
			return {
				...state,
				uploadProgress: {
					...state.uploadProgress,
					[action.payload.hash]: action.payload.percentage,
				},
			};
		}

		default: {
			// @ts-ignore
			assertNever(action);
			return state;
		}
	}
};
