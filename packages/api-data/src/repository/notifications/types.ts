export enum NOTIFICATION_TYPES {
	RECENT_COMMENT = 'RECENT_COMMENT',
	FRIEND_REQUEST = 'FRIEND_REQUEST',
	FRIEND_REQUEST_RESPONSE = 'FRIEND_REQUEST_RESPONSE',
	GROUP_REQUEST = 'GROUP_REQUEST',
	SUPER_LIKED = 'SUPER_LIKED',
}

export interface INotificationData {
	type: NOTIFICATION_TYPES;
	from: {
		alias: string;
		pub: string;
	};
	to: {
		alias: string;
		pub: string;
	};
	timestamp: number;
}

export interface INotificationsReturnData {
	[key: string]: INotificationData;
}

export interface INotificationByIdInput {
	notificationId: string;
}

export interface IRemoveNotificationInput {
	notificationId: string;
}
