/**
 * TODO list:
 * 1. Props data: notifications, loading, refreshing
 * 2. Props actions: loadNotifications, checkNotification, acceptFriendRequest, declineFriendRequest, getText, hideConfirm,
 */

import * as React from 'react';
import {NOTIFICATION_TYPES} from '../../../environment/consts';
import {IConfirmActions, IConfirmationModalProps, ITranslatedProps} from '../../../types';

const mock: IWithNotificationsEnhancedProps = {
	data: {
		notifications: [
			{
				requestId: '123tqa5',
				type: NOTIFICATION_TYPES.RECENT_COMMENT,
				avatarURL: 'https://placeimg.com/150/150/tech',
				fullName: 'Seth Saunders',
				timestamp: new Date(2018, 2, 12, 5, 51, 23),
				wallPosts: [
					{
						postThumbURL: 'https://placeimg.com/140/140/nature',
						postId: '11',
					},
					{
						postThumbURL: 'https://placeimg.com/141/141/nature',
						postId: '22',
					},
					{
						postThumbURL: 'https://placeimg.com/142/142/nature',
						postId: '33',
					},
					{
						postThumbURL: 'https://placeimg.com/143/143/nature',
						postId: '44',
					},
					{
						postThumbURL: 'https://placeimg.com/144/144/nature',
						postId: '55',
					},
				],
			},
			{
				requestId: '981326537',
				type: NOTIFICATION_TYPES.FRIEND_REQUEST,
				avatarURL: 'https://placeimg.com/151/151/people',
				fullName: 'Teresa Lamb',
				// userName: 'terlamb',
			},
			{
				requestId: '981326538',
				type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
				avatarURL: 'https://placeimg.com/160/160/people',
				fullName: 'Teresa Lamb',
				userName: 'terlamb',
				text: 'Friend request accepted.',
			},
			{
				requestId: 'a24362',
				type: NOTIFICATION_TYPES.SUPER_LIKED,
				avatarURL: 'https://placeimg.com/152/152/tech',
				fullName: 'Cory Maxwell',
				timestamp: new Date(2018, 1, 24, 8, 23, 12),
				wallPosts: [
					{
						postThumbURL: 'https://placeimg.com/130/130/arch',
						postId: '130',
					},
					{
						postThumbURL: 'https://placeimg.com/131/131/arch',
						postId: '131',
					},
					{
						postThumbURL: 'https://placeimg.com/132/132/arch',
						postId: '132',
					},
					{
						postThumbURL: 'https://placeimg.com/133/133/arch',
						postId: '133',
					},
					{
						postThumbURL: 'https://placeimg.com/135/135/arch',
						postId: '134',
					},
				],
			},
			{
				requestId: '990325',
				type: NOTIFICATION_TYPES.GROUP_REQUEST,
				avatarURL: 'https://placeimg.com/150/150/tech',
				fullName: 'Claudia Kulmitzer',
				groupName: 'MfMJAkkAs2jLISYyv',
			},
		],
		loading: false,
		refreshing: false,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		showConfirm: (confirmationOptions: IConfirmationModalProps) => {
			/**/
		},
		hideConfirm: () => {
			/**/
		},
		loadNotifications: () => {
			/**/
		},
		checkNotification: (requestId: string) => {
			/**/
		},
		acceptFriendRequest: (requestId: string) => {
			/**/
		},
		declineFriendRequest: (requestId: string) => {
			/**/
		},
	},
};

interface INotificationData {
	requestId: string;
	type: NOTIFICATION_TYPES;
	fullName: string;
	avatarURL?: string;
	userName?: string;
	timestamp?: Date;
	text?: string;
	groupName?: string;
	wallPosts?: Array<{
		postThumbURL: string;
		postId: string;
	}>;
}

export interface IWithNotificationsEnhancedData {
	notifications: INotificationData[];
	loading: boolean;
	refreshing: boolean;
}

export interface IWithNotificationsEnhancedActions extends ITranslatedProps, IConfirmActions {
	loadNotifications: () => void;
	checkNotification: (requestId: string) => void;
	acceptFriendRequest: (requestId: string) => void;
	declineFriendRequest: (requestId: string) => void;
}

interface IWithNotificationsEnhancedProps {
	data: IWithNotificationsEnhancedData;
	actions: IWithNotificationsEnhancedActions;
}

interface IWithNotificationsProps {
	children(props: IWithNotificationsEnhancedProps): JSX.Element;
}

interface IWithNotificationsState {}

export class WithNotifications extends React.Component<IWithNotificationsProps, IWithNotificationsState> {
	render() {
		const {children} = this.props;
		return children({data: mock.data, actions: mock.actions});
	}
}
