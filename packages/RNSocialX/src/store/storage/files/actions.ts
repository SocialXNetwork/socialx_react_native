import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
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
		/**/
	}
};
