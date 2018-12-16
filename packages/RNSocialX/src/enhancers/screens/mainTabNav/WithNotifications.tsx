/**
 * TODO list:
 * OBS: Only FRIEND_REQUEST and FRIEND_REQUEST_RESPONSE are implemented right now
 */

import * as React from 'react';

import { INotification, IOptionsMenuProps, ITranslatedProps } from '../../../types';

import {
	ActionTypes,
	IClearFriendRequestInput,
	IClearFriendResponseInput,
	IUnreadNotificationsInput,
} from '../../../store/data/notifications';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNotifications as WithNotificationsData } from '../../connectors/data/WithNotifications';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { getActivity, mapRequestsToNotifications } from '../../helpers';

export interface IWithNotificationsEnhancedData {
	notifications: {
		all: INotification[];
		unreadRequests: IClearFriendRequestInput[];
		unreadResponses: IClearFriendResponseInput[];
	};
	refreshing: boolean;
}

export interface IWithNotificationsEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	getNotifications: () => void;
	markNotificationsAsRead: (input: IUnreadNotificationsInput) => void;
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
										{({
											friendRequests,
											friendResponses,
											getNotifications,
											markNotificationsAsRead,
										}) =>
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
												},
												actions: {
													getNotifications,
													markNotificationsAsRead,
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
