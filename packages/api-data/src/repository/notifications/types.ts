export enum NOTIFICATION_TYPES {
	RECENT_COMMENT = 'RECENT_COMMENT',
	FRIEND_REQUEST = 'FRIEND_REQUEST',
	FRIEND_REQUEST_RESPONSE = 'FRIEND_REQUEST_RESPONSE',
	GROUP_REQUEST = 'GROUP_REQUEST',
	SUPER_LIKED = 'SUPER_LIKED',
}

export enum NOTIFICATION_TABLE_NAMES {
	RECENT_COMMENT = 'recent_comments',
	FRIEND_REQUEST = 'friend_requests',
	FRIEND_REQUEST_RESPONSE = 'friend_request_responses',
	GROUP_REQUEST = 'group_requests',
	SUPER_LIKED = 'super_likes',
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

export interface INotificationsReturnData extends INotificationData {
	notificationId: string;
}

export interface IRemoveNotificationInput {
	notificationId: string;
}
