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
	metaData?: {
		postId?: string;
		commentId?: string;
	};
	timestamp: number;
}

export interface INotificationReturnData extends INotificationData {
	notificationId: string;
}

export interface ICreateNotification extends INotificationData {
	to: string;
}

export interface INotificationsReturnData {
	[key: string]: INotificationData;
}

export interface IRemoveNotificationInput {
	notificationId: string;
}
