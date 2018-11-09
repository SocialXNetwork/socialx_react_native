import { FriendResponses } from '../profiles';

export enum NotificationType {
	FriendRequests,
	FriendRequestResponses,
	// TODO: below
	NewFriendsPosts,
	NewGlobalPosts,
	NewDirectMessage,
	NewGroupMessage,
}

export interface INotificationHookArgs {
	type: NotificationType;
	// meta / carry / pass
}

// data stuff

export interface IFriendRequest {
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
}

export interface IFriendRequests {
	[alias: string]: IFriendRequest;
}

export interface IFriendResponse {
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	type: FriendResponses;
}

export interface IFriendResponses {
	[alias: string]: IFriendResponse;
}
