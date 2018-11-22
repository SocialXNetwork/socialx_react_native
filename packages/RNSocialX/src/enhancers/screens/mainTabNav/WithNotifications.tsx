/**
 * TODO list:
 * OBS: Only FRIEND_REQUEST and FRIEND_REQUEST_RESPONSE are implemented right now
 */

import * as React from 'react';

import {
	INavigationParamsActions,
	INotificationData,
	IOptionsMenuProps,
	ITranslatedProps,
} from '../../../types';

import { ActionTypes } from '../../../store/data/notifications/Types';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithNotifications as WithNotificationsData } from '../../connectors/data/WithNotifications';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { getActivity, mapRequestsToNotifications } from '../../helpers';

export interface IWithNotificationsEnhancedData {
	notifications: INotificationData[];
	refreshing: boolean;
}

export interface IWithNotificationsEnhancedActions
	extends ITranslatedProps,
		IOptionsMenuProps,
		INavigationParamsActions {
	getNotifications: () => void;
	removeNotification: (input: { notificationId: string }) => void;
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
									<WithOverlays>
										{({ showOptionsMenu }) => (
											<WithActivities>
												{({ activities }) => (
													<WithNotificationsData>
														{({
															friendRequests,
															friendResponses,
															getNotifications,
															removeNotification,
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
																		appConfig.ipfsConfig.ipfs_URL,
																	),
																},
																actions: {
																	getNotifications,
																	removeNotification,
																	showOptionsMenu: (items) => showOptionsMenu({ items }),
																	setNavigationParams,
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
							</WithNavigationParams>
						)}
					</WithI18n>
				)}
			</WithConfig>
		);
	}
}
