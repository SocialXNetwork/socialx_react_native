/**
 * TODO list:
 * OBS: Only FRIEND_REQUEST and FRIEND_REQUEST_RESPONSE are implemented right now
 */

import * as React from 'react';

import { IOptionsMenuProps, ITranslatedProps } from '../../../types';

import { ActionTypes } from '../../../store/data/notifications';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNotifications as WithNotificationsData } from '../../connectors/data/WithNotifications';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { getActivity } from '../../helpers';

export interface IWithNotificationsEnhancedData {
	notificationIds: string[];
	unread: boolean;
	refreshing: boolean;
}

export interface IWithNotificationsEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	getNotifications: () => void;
	markNotificationsAsRead: () => void;
}

interface IWithNotificationsEnhancedProps {
	data: IWithNotificationsEnhancedData;
	actions: IWithNotificationsEnhancedActions;
}

interface IWithNotificationsProps {
	children(props: IWithNotificationsEnhancedProps): JSX.Element;
}

interface IWithNotificationsState {}

export class WithNotifications extends React.Component<
	IWithNotificationsProps,
	IWithNotificationsState
> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithActivities>
								{({ activities }) => (
									<WithNotificationsData>
										{({ ids, unread, getNotifications, markNotificationsAsRead }) =>
											this.props.children({
												data: {
													refreshing: getActivity(activities, ActionTypes.GET_NOTIFICATIONS),
													notificationIds: ids,
													unread: unread.length > 0,
												},
												actions: {
													getNotifications,
													markNotificationsAsRead,
													showOptionsMenu,
													getText,
												},
											})
										}
									</WithNotificationsData>
								)}
							</WithActivities>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
