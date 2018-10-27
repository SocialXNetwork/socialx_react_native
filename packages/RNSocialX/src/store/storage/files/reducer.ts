import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_UPLOAD_STATUS: {
			return {
				uploads: [
					...state.uploads.filter((upload) => upload.uploadId !== action.payload.uploadId),
					action.payload,
				],
			};
		}

		case ActionTypes.UPLOAD_FILE: {
			return state;
		}

		case ActionTypes.REMOVE_UPLOADED_FILES: {
			return {
				uploads: [...state.uploads.filter((upload) => upload.done)],
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
