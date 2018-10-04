import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_UPLOAD_PROGRESS: {
			return {
				uploadProgress: {
					...state.uploadProgress,
					[action.payload.hash]: action.payload.percentage,
				},
			};
		}

		case 'RESET_STORE': {
			return {
				uploadProgress: Object.entries(state.uploadProgress)
					.filter(([id, progress]) => progress < 100)
					.reduce(
						(stateAcc, [id, progress]) => ({ ...stateAcc, [id]: progress }),
						{},
					),
			};
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
