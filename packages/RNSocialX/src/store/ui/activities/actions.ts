import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import { defaultClearErrorTimeout } from './constants';
import {
	ActionTypes,
	IActivity,
	IActivityAction,
	IError,
	IErrorAction,
} from './Types';

const activityAction: ActionCreator<IActivityAction> = (
	activity: IActivity,
) => ({
	type: ActionTypes.ACTIVITY,
	payload: activity,
});

export const beginActivity = (activity: {
	uuid: string;
	type: string;
}): IThunk => async (dispatch, getState, context) => {
	dispatch(
		activityAction({
			...activity,
			done: false,
			timestamp: new Date(Date.now()).getTime(),
		}),
	);
};

export const endActivity = (activity: {
	uuid: string;
	type: string;
}): IThunk => async (dispatch, getState, context) => {
	dispatch(
		activityAction({
			...activity,
			done: true,
		}),
	);
};

const errorAction: ActionCreator<IErrorAction> = (error: IError) => ({
	type: ActionTypes.ERROR,
	payload: error,
});

export const setError = (error: IError): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(errorAction(error));
		setTimeout(() => {
			dispatch(clearError({ uuid: error.uuid }));
		}, error.timeout || defaultClearErrorTimeout);
	} catch (e) {
		// Dispatching an error here would most probably
		// create an infinite loop so let's simply log it
		console.error(
			`Awkward... an error occured while dispatching an error ${e}`,
		);
	}
};

export const clearError = ({ uuid }: { uuid: string }): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(errorAction({ uuid, type: null, error: null }));
	} catch (e) {
		// Dispatching an error here would most probably
		// create an infinite loop so let's simply log it
		console.error(`Awkward... an error occured while clearing an error ${e}`);
	}
};
