/**
 * TODO list:
 * OBS: Only FRIEND_REQUEST and FRIEND_REQUEST_RESPONSE are implemented right now
 */

import * as React from 'react';

import { NOTIFICATION_TYPES } from '../../../environment/consts';
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

const mock: IWithNotificationsEnhancedProps = {
	data: {
		notifications: [
			{
				notificationId: '51asfa1',
				userId: '123tqa5',
				type: NOTIFICATION_TYPES.RECENT_COMMENT,
				avatar: 'https://lifehacks.io/wp-content/uploads/21-Questions-to-ask-a-guy.jpg',
				fullName: 'Seth Saunders',
				userName: 'sethsaunders',
				timestamp: new Date(2018, 2, 12, 5, 51, 23),
			},
			{
				notificationId: '51asfa2',
				userId: '981326537',
				type: NOTIFICATION_TYPES.FRIEND_REQUEST,
				avatar:
					'https://static1.squarespace.com/static/5717fbc72eeb81a7600203c4/t/57361baa45bf2122c02109d3/1463163822530/teresa-ting-104-WEB.jpg',
				fullName: 'Teresa Lamb',
				userName: 'terlamb',
				timestamp: new Date(2018, 1, 24, 8, 23, 12),
			},
			{
				notificationId: '51asfa3',
				userId: '981326538',
				type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
				avatar:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhxxOvVEmfKWgIxdz1Xvd0zTKY4oHlC8E709FF91o5FMTirI2T',
				fullName: 'Sophie Smith',
				userName: 'sophsmt',
				timestamp: new Date(2018, 2, 12, 5, 51, 23),
			},
			{
				notificationId: '51asfa4',
				userId: 'a24362',
				type: NOTIFICATION_TYPES.SUPER_LIKED,
				avatar:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhQDjvfpOkYBNz_sFX6egUWv-tKgr9iwb9S0ECK5Ll8C-I9Oj',
				fullName: 'Cory Maxwell',
				userName: 'corymaxwell',
				timestamp: new Date(2018, 1, 24, 8, 23, 12),
			},
			{
				notificationId: '51asfa5',
				userId: '990325',
				type: NOTIFICATION_TYPES.GROUP_REQUEST,
				avatar:
					'https://yt3.ggpht.com/a-/AN66SAyxvKvpstRZN6-LzcuggRm6kEQs-lKW5cOg6g=s900-mo-c-c0xffffffff-rj-k-no',
				fullName: 'Claudia Kulmitzer',
				groupName: 'MfMJAkkAs2jLISYyv',
			},
		],
		refreshing: false,
	},
	actions: {
		loadNotifications: () => undefined,
		acceptFriendRequest: (input: IFriendshipInput) => undefined,
		declineFriendRequest: (input: IFriendshipInput) => undefined,
		removeNotification: (notificationId: string) => undefined,
		setNavigationParams: () => undefined,
		getText: (value: string, ...args: any[]) => value,
	},
};

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
														{({ friendRequests, friendResponses, getNotifications }) => {
															return this.props.children({
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
															});
														}}
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
