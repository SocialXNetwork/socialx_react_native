/**
 * TODO list:
 * OBS: Only FRIEND_REQUEST and FRIEND_REQUEST_RESPONSE are implemented right now
 */

import * as React from 'react';

import { INotificationData, IOptionsMenuProps, ITranslatedProps } from '../../../types';

import { ActionTypes } from '../../../store/data/notifications/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNotifications as WithNotificationsData } from '../../connectors/data/WithNotifications';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { getActivity, getUnreadNotifications, mapRequestsToNotifications } from '../../helpers';

export interface IWithNotificationsEnhancedData {
	notifications: INotificationData[];
	unreadNotifications: number;
	refreshing: boolean;
}

export interface IWithNotificationsEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	getNotifications: () => void;
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
										{({ friendRequests, friendResponses, getNotifications }) =>
											this.props.children({
												data: {
													refreshing: getActivity(
														activities,
														ActionTypes.GET_CURRENT_NOTIFICATIONS,
													),
													notifications: mapRequestsToNotifications(
														friendRequests,
														friendResponses,
													),
													unreadNotifications: getUnreadNotifications(
														friendRequests,
														friendResponses,
													),
												},
												actions: {
													getNotifications,
													showOptionsMenu: (items) => showOptionsMenu({ items }),
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
