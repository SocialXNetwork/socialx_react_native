import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { setError } from '../../ui/activities';
import {
	ActionTypes,
	ISetUploadProgressAction,
	ISetUploadProgressInput,
} from './Types';

const setUploadProgressAction: ActionCreator<ISetUploadProgressAction> = (
	setUploadProgressInput: ISetUploadProgressInput,
) => ({
	type: ActionTypes.SET_UPLOAD_PROGRESS,
	payload: setUploadProgressInput,
});

export const setUploadProgress = (
	setUploadProgressInput: ISetUploadProgressInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(setUploadProgressAction(setUploadProgressInput));
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.SET_UPLOAD_PROGRESS,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};
