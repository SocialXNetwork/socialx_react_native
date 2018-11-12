/**
 * TODO list:
 * OBS: Only FRIEND_REQUEST and FRIEND_REQUEST_RESPONSE are implemented right now
 */

import * as React from 'react';

import {
	IFriendshipInput,
	INavigationParamsActions,
	INotificationData,
	ITranslatedProps,
} from '../../../types';

import { ActionTypes } from '../../../store/data/notifications/Types';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithNotifications as WithNotificationsData } from '../../connectors/data/WithNotifications';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { getActivity, mapRequestsToNotifications } from '../../helpers';

export interface IWithNotificationsEnhancedData {
	notifications: INotificationData[];
	refreshing: boolean;
}

export interface IWithNotificationsEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions {
	loadNotifications: () => void;
	acceptFriendRequest: (input: IFriendshipInput) => void;
	declineFriendRequest: (input: IFriendshipInput) => void;
	removeNotification: (notificationId: string) => void;
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
			<WithConfig>
				{({ appConfig }) => (
					<WithI18n>
						{({ getText }) => (
							<WithNavigationParams>
								{({ setNavigationParams }) => (
									<WithActivities>
										{({ activities }) => (
											<WithProfiles>
												{({ acceptFriend, rejectFriend }) => (
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
																		appConfig.ipfsConfig.ipfs_URL,
																	),
																},
																actions: {
																	loadNotifications: getNotifications,
																	acceptFriendRequest: (input) => acceptFriend(input),
																	declineFriendRequest: (input) => rejectFriend(input),
																	removeNotification: (notificationId) => undefined,
																	setNavigationParams,
																	getText,
																},
															})
														}
													</WithNotificationsData>
												)}
											</WithProfiles>
										)}
									</WithActivities>
								)}
							</WithNavigationParams>
						)}
					</WithI18n>
				)}
			</WithConfig>
		);
	}
}
