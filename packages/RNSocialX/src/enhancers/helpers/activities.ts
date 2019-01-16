import { ActionTypes as AccountActionTypes } from '../../store/data/accounts/Types';
import { ActionTypes as PostActionTypes } from '../../store/data/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../store/data/profiles/Types';
import { IActivity } from '../../store/ui/activities';

export const getActivity = (activities: IActivity[], activityType: string | null) => {
	return activities.filter((activity) => activity.type === activityType).length > 0;
};

export const getActivities = (activities: IActivity[], activityTypes: Array<string | null>) => {
	return activities.filter((activity) => activityTypes.includes(activity.type)).length > 0;
};

export const getActivityForFriends = (activities: IActivity[], activityType: string | null) => {
	return activities.find((activity) => activity.type === activityType) || null;
};

export const getActivitiesForIndicator = (activities: IActivity[]) => {
	for (const activity of activities) {
		if (
			activity.type === AccountActionTypes.GET_CURRENT_ACCOUNT ||
			activity.type === AccountActionTypes.CREATE_ACCOUNT ||
			activity.type === AccountActionTypes.LOGIN ||
			activity.type === ProfileActionTypes.GET_CURRENT_PROFILE ||
			activity.type === PostActionTypes.CREATE_POST
		) {
			return true;
		}
	}

	return false;
};
