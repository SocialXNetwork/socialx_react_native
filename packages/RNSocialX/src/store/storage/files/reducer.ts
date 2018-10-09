import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_UPLOAD_STATUS: {
			const { uploadId, ...fileStatus } = action.payload;
			return {
				uploads: {
					...state.uploads,
					[uploadId]: {
						...state.uploads[uploadId],
						...fileStatus,
					},
				},
			};
		}

		case ActionTypes.UPLOAD_FILE: {
			return state;
		}

		case 'RESET_STORE': {
			return {
				uploads: Object.entries(state.uploads)
					.filter(([id, file]) => file.done)
					.reduce(
						(stateAcc, [id, file]) => ({ ...stateAcc, [id]: file.progress }),
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
