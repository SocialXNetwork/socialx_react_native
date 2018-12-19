import { FriendResponses, IFriendData } from '../profiles';

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
	id: string;
	fullName: string;
	avatar: string;
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	type: string;
	read: boolean;
}

export interface IFriendRequests {
	[alias: string]: IFriendRequest;
}

export interface IFriendResponse {
	id: string;
	fullName: string;
	avatar: string;
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	type: FriendResponses;
	read: boolean;
}

export interface IFriendResponses {
	[alias: string]: IFriendResponse;
}

export interface IFriendRequestsCallback {
	profiles: IFriendData[];
	requests: IFriendRequests;
}

export interface IFriendResponsesCallback {
	profiles: IFriendData[];
	responses: IFriendResponses;
}
