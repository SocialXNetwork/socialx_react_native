import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	beginActivity,
	clearError,
	endActivity,
	IActivity,
	IError,
	setError,
} from '../../../store/ui/activities';

const selectActivities = createSelector(
	(state: IApplicationState) => state.ui.activities.activities,
	(activities) => activities,
);

const selectErrors = createSelector(
	(state: IApplicationState) => state.ui.activities.errors,
	(errors) => errors,
);

export const useActivitiesData = () => ({
	activities: useSelector(selectActivities),
	errors: useSelector(selectErrors),
});

export const useActivitiesActions = () => {
	const dispatch = useDispatch();

	return {
		beginActivity: (activity: IActivity) => dispatch(beginActivity(activity)),
		endActivity: ({ uuid }: { uuid: string }) => dispatch(endActivity({ uuid })),
		setError: (error: IError) => dispatch(setError(error)),
		clearError: ({ uuid }: { uuid: string }) => dispatch(clearError({ uuid })),
	};
};
