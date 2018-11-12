import { IContext, IGunCallback, IGunInstance, TABLE_ENUMS, TABLES } from '../../types';
import { ApiError } from '../../utils/errors';
import * as profileHandles from './handles';

import uuidv4 from 'uuid/v4';

import { getContextMeta } from '../../utils/helpers';
import {
	FRIEND_TYPES,
	FriendResponses,
	IAcceptFriendInput,
	IAddFriendInput,
	IClearFriendResponseInput,
	ICreateProfileInput,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from './types';

const pollyLoadAccounts = (gun: IGunInstance, cb: any) => {
	gun.path(TABLES.PROFILES).docLoad(() => {
		cb();
	});
};

const preLoadFriendRequests = (gun: IGunInstance, cb: any) => {
	gun.path(`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}`).once(() => {
		cb();
	});
};

export const createProfile = (
	context: IContext,
	createProfileInput: ICreateProfileInput,
	callback: IGunCallback<null>,
) => {
	const { gun } = context;
	const { username: alias, ...rest } = createProfileInput;
	/**
	 * add the profile data to the current user's private scope profile record
	 */
	const mainRunner = () => {
		profileHandles.currentUserProfileData(context).put(
			{
				...rest,
				alias,
			},
			(createProfileOnAccCallback) => {
				if (createProfileOnAccCallback.err) {
					return callback(
						new ApiError(
							`failed to create user profile on current account ${createProfileOnAccCallback.err}`,
							{
								initialRequestBody: createProfileInput,
							},
						),
					);
				}
				pollyLoadAccounts(gun, () =>
					createUserProfRaw(profileHandles.currentUserProfileData(context)),
				);
			},
		);
	};
	/**
	 * reference the private user's profile to the public profiles record
	 * @param ref IGunInstance reference to the private scope user profile
	 */
	const createUserProfRaw = (ref: IGunInstance) => {
		profileHandles.publicProfileByUsername(context, alias).put(ref, (profileCallback) => {
			if (profileCallback.err) {
				return callback(
					new ApiError(`failed to create user profile ${profileCallback.err}`, {
						initialRequestBody: createProfileInput,
					}),
				);
			}

			return callback(null);
		});
	};
	// run sequence
	mainRunner();
};

export const updateProfile = (
	context: IContext,
	updateProfileInput: IUpdateProfileInput,
	callback: IGunCallback<null>,
) => {
	/**
	 * update the current user's private scope profile, this will reflect changes on the public scope
	 * aswell because the public scope has a reference to the private scope record
	 */
	const mainRunner = () => {
		profileHandles.currentUserProfileData(context).put(updateProfileInput, (updateCallback) => {
			if (updateCallback.err) {
				return callback(
					new ApiError(`failed to update user profile ${updateCallback.err}`, {
						initialRequestBody: updateProfileInput,
					}),
				);
			}
			return callback(null);
		});
	};
	// run sequence
	mainRunner();
};

/**
 * check if the current user is already friends with the targeted user
 */
const checkIfProfileExists = (context: IContext, username: string) => {
	return new Promise((res, rej) =>
		profileHandles
			.currentProfileFriendByUsername(context, username)
			.once((currentFriendCallback: any) => {
				if (currentFriendCallback) {
					rej(new ApiError(`profile already exists`));
				}
				res();
			}),
	);
};

/**
 * check if the current user already send a friend request to the targeted user
 */
const checkIfFriendRequestExists = (context: IContext, to: string, from: string) => {
	return new Promise((res, rej) =>
		profileHandles
			.publicFriendRequestToFrom(context, to, from)
			.once((currentRequestCallback: any) => {
				if (currentRequestCallback) {
					res(true);
				}
				res(false);
			}),
	);
};

/**
 * check if the current user has this specific friend response
 */
const checkIfFriendResponseExists = (context: IContext, from: string) => {
	return new Promise((res, rej) =>
		profileHandles
			.publicCurrentFriendResponseFrom(context, from)
			.once((currentResponseCallback: any) => {
				if (currentResponseCallback.err) {
					res(false);
				}
				if (currentResponseCallback) {
					res(true);
				}
				res(false);
			}),
	);
};

/**
 * check if the targeted user exists and get his profile reference then pass it to create profile
 */
const getTargetedUserAndCreateRequest = (context: IContext, username: string) => {
	return new Promise((res, rej) =>
		profileHandles.publicProfileByUsername(context, username).once((userProfileCallback: any) => {
			if (!userProfileCallback) {
				rej(new ApiError(`user does not exist!`));
			}
			res();
		}),
	);
};

/**
 * create a friend record on the current user's private scope and put the friend's entire profile reference
 * @param
 */
const createFriendPrivateRecord = (context: IContext, username: string) => {
	return new Promise((res, rej) =>
		profileHandles
			.currentProfileFriendByUsername(context, username)
			.put(profileHandles.publicProfileByUsername(context, username), (friendCreationCallback) => {
				if (friendCreationCallback.err) {
					rej(new ApiError(`something went wrong on creating the friend!`));
				}
				res();
			}),
	);
};

/**
 * remove friend from the current user's private friends record
 */
const removeFriendFromPrivateRecord = (context: IContext, username: string) => {
	return new Promise((res, rej) =>
		profileHandles.currentProfileFriendsRecord(context).erase(username, (removeFriendCallback) => {
			if (removeFriendCallback.err) {
				rej(new ApiError(`something went wrong on deleting the friend`));
			}
			res();
		}),
	);
};

/**
 * remove the pending friend request from the public record of friend requests
 * @param
 */
const removePendingAndProceed = (context: IContext, username: string) => {
	return new Promise((res, rej) =>
		profileHandles.publicCurrentFriendRequests(context).erase(username, (removePendingCallback) => {
			if (removePendingCallback.err) {
				rej(new ApiError(`cannot remove pending friend request`));
			}
			res();
		}),
	);
};

/**
 * remove the friend response from the current users public record
 * @param
 */
const removeFriendResponse = (context: IContext, username: string) => {
	return new Promise((res, rej) =>
		profileHandles
			.publicCurrentFriendResponse(context)
			.erase(username, (removeResponseCallback) => {
				if (removeResponseCallback.err) {
					rej(new ApiError(`cannot remove friend response`));
				}
				res();
			}),
	);
};

/**
 * remove the friend response from the current users public record
 * @param
 */
const getCurrentUserProfile = (context: IContext) => {
	const { account } = context;
	return new Promise((res, rej) =>
		account.path(`profile.${account.is.alias}`).open(
			(profile) => {
				res(profile);
			},
			{ off: 1, wait: 400 },
		),
	);
};

/**
 * get the public record of friend requests to the user from the current user and put the friend request data
 */
const createFriendRequestNotification = (
	context: IContext,
	username: string,
	uuid: string,
	fullName: string,
	avatar: string,
) => {
	const { owner, ownerPub, timestamp } = getContextMeta(context);
	return new Promise((res, rej) =>
		profileHandles.publicCurrentFriendRequestToUsername(context, username).put(
			{
				id: uuid,
				fullName,
				avatar,
				owner: {
					alias: owner,
					pub: ownerPub,
				},
				timestamp,
			},
			(friendRequestCreationCallback) => {
				if (friendRequestCreationCallback.err) {
					rej(new ApiError(`something went wrong on creating the friend request to the user!`));
				}
				res();
			},
		),
	);
};

const createFriendRequestResponse = (
	context: IContext,
	to: string,
	response: FriendResponses,
	uuid: string,
	fullName: string,
	avatar: string,
) => {
	const { owner, ownerPub, timestamp } = getContextMeta(context);
	return new Promise((res, rej) =>
		profileHandles.publicFriendResponseToFrom(context, owner, to).put(
			{
				id: uuid,
				fullName,
				avatar,
				owner: {
					alias: owner,
					pub: ownerPub,
				},
				timestamp,
				type: response,
			},
			(friendResponseCallback) => {
				if (friendResponseCallback.err) {
					rej(
						new ApiError(
							`something went wrong while creating a response -> ${friendResponseCallback.err}`,
						),
					);
				}
				res();
			},
		),
	);
};

export const addFriend = async (
	context: IContext,
	{ username }: IAddFriendInput,
	callback: IGunCallback<null>,
) => {
	try {
		const { account } = context;
		if (!account.is) {
			return callback(
				new ApiError(`no user logged in`, {
					initialRequestBody: { username },
				}),
			);
		}
		const { owner } = getContextMeta(context);
		const errPrefix = 'failed to add friend';
		if (owner === username) {
			return callback(
				new ApiError(`${errPrefix}, can not add self`, {
					initialRequestBody: { username },
				}),
			);
		}

		await checkIfProfileExists(context, username);
		console.log('current profile exists');
		const friendRequestExists = await checkIfFriendRequestExists(
			context,
			username,
			account.is.alias,
		);
		if (friendRequestExists) {
			return callback(new ApiError('friend request already exists'));
		}
		await getTargetedUserAndCreateRequest(context, username);
		preLoadFriendRequests(context.gun, async () => {
			await createFriendPrivateRecord(context, username);
			const profile: any = await getCurrentUserProfile(context);
			await createFriendRequestNotification(
				context,
				username,
				uuidv4(),
				profile.fullName,
				profile.avatar,
			);
			callback(null);
		});
	} catch (e) {
		callback(e);
	}
};

export const removeFriend = async (
	context: IContext,
	{ username }: IRemoveFriendInput,
	callback: IGunCallback<null>,
) => {
	const { account } = context;
	if (!account.is) {
		return callback(
			new ApiError('no user logged in', {
				initialRequestBody: { username },
			}),
		);
	}
	try {
		await checkIfProfileExists(context, username);
		await removeFriendFromPrivateRecord(context, username);
		callback(null);
	} catch (e) {
		callback(e);
	}
};

export const acceptFriend = async (
	context: IContext,
	{ username }: IAcceptFriendInput,
	callback: IGunCallback<null>,
) => {
	try {
		const { account } = context;
		if (!account.is) {
			return callback(
				new ApiError('no user logged in', {
					initialRequestBody: { username },
				}),
			);
		}
		const friendRequestExists = await checkIfFriendRequestExists(
			context,
			account.is.alias,
			username,
		);
		if (!friendRequestExists) {
			return callback(new ApiError('friend request does not exist'));
		}
		await checkIfProfileExists(context, username);
		await removePendingAndProceed(context, username);
		const profile: any = await getCurrentUserProfile(context);
		await createFriendRequestResponse(
			context,
			username,
			FriendResponses.Accepted,
			uuidv4(),
			profile.fullName,
			profile.avatar,
		);
		await createFriendPrivateRecord(context, username);
		callback(null);
	} catch (e) {
		callback(e);
	}
};

export const rejectFriend = async (
	context: IContext,
	{ username }: IAcceptFriendInput,
	callback: IGunCallback<null>,
) => {
	try {
		const { account } = context;
		if (!account.is) {
			return callback(
				new ApiError('no user logged in', {
					initialRequestBody: { username },
				}),
			);
		}
		const friendRequestExists = await checkIfFriendRequestExists(
			context,
			account.is.alias,
			username,
		);
		if (!friendRequestExists) {
			return callback(new ApiError('friend request does not exist'));
		}
		await checkIfProfileExists(context, username);
		await removePendingAndProceed(context, username);
		const profile: any = await getCurrentUserProfile(context);
		await createFriendRequestResponse(
			context,
			username,
			FriendResponses.Rejected,
			uuidv4(),
			profile.fullName,
			profile.avatar,
		);
		callback(null);
	} catch (e) {
		callback(e);
	}
};

export const clearFriendResponse = async (
	context: IContext,
	{ username }: IClearFriendResponseInput,
	callback: IGunCallback<null>,
) => {
	try {
		const { account } = context;
		if (!account.is) {
			return callback(
				new ApiError('no user logged in', {
					initialRequestBody: { username },
				}),
			);
		}
		const friendResponseExists = await checkIfFriendResponseExists(context, username);
		if (!friendResponseExists) {
			return callback(new ApiError('friend response does not exist'));
		}
		await checkIfProfileExists(context, username);
		await removeFriendResponse(context, username);
		callback(null);
	} catch (e) {
		callback(e);
	}
};

export default {
	createProfile,
	updateProfile,
	addFriend,
	removeFriend,
	acceptFriend,
	rejectFriend,
	clearFriendResponse,
};
