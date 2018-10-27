import { IActivity } from '../../store/ui/activities';

export const getActivity = (activities: IActivity[], activityType: string | null) => {
	return activities.filter((activity) => activity.type === activityType).length > 0;
};
