import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import { ActionTypes, IActivity, IActivityAction } from './Types';

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
