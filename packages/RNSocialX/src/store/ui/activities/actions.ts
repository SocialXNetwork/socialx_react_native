import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
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

export const beginActivity = (activity: IActivity): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(activityAction(activity));
	} catch (e) {
		/**/
	}
};

export const endActivity = ({ uuid }: { uuid: string }): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(activityAction({ uuid, type: null }));
	} catch (e) {
		/**/
	}
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
	} catch (e) {
		/**/
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
		/**/
	}
};
