import { IContext, IGunCallback, IGunInstance, TABLES } from '../../types';
import { ApiError } from '../../utils/errors';
import * as profileHandles from './handles';

import uuidv4 from 'uuid/v4';

import { getContextMeta } from '../../utils/helpers';
import {
	FRIEND_TYPES,
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from './types';

const pollyLoadAccounts = (gun: IGunInstance, cb: any) => {
	gun.path(TABLES.PROFILES).docLoad(() => {
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

export const addFriend = (
	context: IContext,
	{ username }: IAddFriendInput,
	callback: IGunCallback<null>,
) => {
	const { account } = context;
	if (!account.is) {
		return callback(
			new ApiError(`no user logged in`, {
				initialRequestBody: { username },
			}),
		);
	}
	const { owner, ownerPub, timestamp } = getContextMeta(context);
	const errPrefix = 'failed to add friend';
	if (owner === username) {
		return callback(
			new ApiError(`${errPrefix}, can not add self`, {
				initialRequestBody: { username },
			}),
		);
	}
	/**
	 * check if the current user is already friends with the targeted user
	 */
	const mainRunner = () => {
		profileHandles
			.currentProfileFriendByUsername(context, username)
			.once((currentFriendCallback: any) => {
				if (currentFriendCallback) {
					return callback(
						new ApiError(`${errPrefix}, can not add already existing friend`, {
							initialRequestBody: { username },
						}),
					);
				}
				checkPending();
			});
	};
	/**
	 * check if the current user already send a friend request to the targeted user
	 */
	const checkPending = () => {
		profileHandles
			.publicCurrentFriendRequestToUsername(context, username)
			.once((currentRequestCallback: any) => {
				if (currentRequestCallback) {
					return callback(
						new ApiError(`${errPrefix}, friend request already sent`, {
							initialRequestBody: { username },
						}),
					);
				}
				getTargetedUserAndCreateRequest();
			});
	};
	/**
	 * check if the targeted user exists and get his profile reference then pass it to create profile
	 */
	const getTargetedUserAndCreateRequest = () => {
		profileHandles.publicProfileByUsername(context, username).once((userProfileCallback: any) => {
			if (!userProfileCallback) {
				return callback(
					new ApiError(`${errPrefix}, user does not exist!`, {
						initialRequestBody: { username },
					}),
				);
			}
			createFriend(profileHandles.publicProfileByUsername(context, username));
		});
	};
	/**
	 * create a friend record on the current user's private scope and put the friend's entire profile reference
	 * @param requestedUserRef object
	 */
	const createFriend = (requestedUserRef: any) => {
		profileHandles
			.currentProfileFriendByUsername(context, username)
			.put(requestedUserRef, (friendCreationCallback) => {
				if (friendCreationCallback.err) {
					return callback(
						new ApiError(`${errPrefix}, something went wrong on creating the friend!`, {
							initialRequestBody: { username },
						}),
					);
				}
				createFriendRequest();
			});
	};
	/**
	 * get the public record of friend requests to the user from the current user and put the friend request data
	 */
	const createFriendRequest = () => {
		profileHandles.publicCurrentFriendRequestToUsername(context, username).put(
			{
				owner: {
					alias: owner,
					pub: ownerPub,
				},
				timestamp,
			},
			(friendRequestCreationCallback) => {
				if (friendRequestCreationCallback.err) {
					return callback(
						new ApiError(
							`${errPrefix}, something went wrong on creating the friend request to the user!`,
							{
								initialRequestBody: { username },
							},
						),
					);
				}
				return callback(null);
			},
		);
	};
	// run the sequence
	mainRunner();
};
export const removeFriend = (
	context: IContext,
	{ username }: IRemoveFriendInput,
	callback: IGunCallback<null>,
) => {
	const { account } = context;
	if (!account.is) {
		return callback(
			new ApiError(`no user logged in`, {
				initialRequestBody: { username },
			}),
		);
	}
	const errPrefix = 'failed to remove friend';
	/**
	 * check if the current user is not a friend with the targeted user
	 */
	const mainRunner = () => {
		profileHandles
			.currentProfileFriendByUsername(context, username)
			.once((currentFriendCallback: any) => {
				if (!currentFriendCallback) {
					return callback(
						new ApiError(`${errPrefix}, can not delete a friend that does not exist (sadface)`, {
							initialRequestBody: { username },
						}),
					);
				}
				removeFriendFromPrivateRecord();
			});
	};
	/**
	 * remove friend from the current user's private friends record
	 */
	const removeFriendFromPrivateRecord = () => {
		profileHandles.currentProfileFriendsRecord(context).erase(username, (removeFriendCallback) => {
			if (removeFriendCallback.err) {
				return callback(
					new ApiError(`${errPrefix}, something went wrong on deleting the friend`, {
						initialRequestBody: { username },
					}),
				);
			}
			return callback(null);
		});
	};
	// run sequence
	mainRunner();
};

export const acceptFriend = (
	context: IContext,
	{ username }: IAcceptFriendInput,
	callback: IGunCallback<null>,
) => {
	const errPrefix = 'failed to accept friend';
	/**
	 * check if the current user indeed has a friendrequest from the targeted user
	 */
	const mainRunner = () => {
		profileHandles
			.publicCurrentFriendRequestFromUsername(context, username)
			.once((currentRequestCallback: any) => {
				if (currentRequestCallback) {
					return callback(
						new ApiError(`${errPrefix}, no friend request found from this user`, {
							initialRequestBody: { username },
						}),
					);
				}
				userExistsCheck();
			});
	};
	/**
	 * check if the user profile exists within the current database segment
	 */
	const userExistsCheck = () => {
		profileHandles
			.publicProfileByUsername(context, username)
			.once((targetUserProfileCallback: any) => {
				if (!targetUserProfileCallback) {
					return callback(
						new ApiError(`${errPrefix}, user doesnt exist on the current public scope`, {
							initialRequestBody: { username },
						}),
					);
				}
				removePendingAndProceed(profileHandles.publicCurrentFriendRequests(context));
			});
	};
	/**
	 * remove the pending friend request from the public record of friend requests
	 * @param requests IGunInstance the current user public record of friend requests
	 */
	const removePendingAndProceed = (requests: IGunInstance) => {
		requests.erase(username, (removePendingCallback) => {
			if (removePendingCallback.err) {
				return callback(
					new ApiError(`${errPrefix}, cannot remove pending friend request`, {
						initialRequestBody: { username },
					}),
				);
			}
			addRequestedUserAsFriend(profileHandles.publicProfileByUsername(context, username));
		});
	};
	/**
	 * adds the targeted user to the current user private scope friends record
	 * @param friendProfileReference IGunInstance the reference to the public profile record of the targeted user
	 */
	const addRequestedUserAsFriend = (friendProfileReference: IGunInstance) => {
		profileHandles
			.currentProfileFriendByUsername(context, username)
			.put(friendProfileReference, (addFriendCallback) => {
				if (addFriendCallback.err) {
					return callback(
						new ApiError(`${errPrefix}, something went wrong, could not add the user as a friend`, {
							initialRequestBody: { username },
						}),
					);
				}
				return callback(null);
			});
	};
	// run sequence
	mainRunner();
};

export default {
	createProfile,
	updateProfile,
	addFriend,
	removeFriend,
	acceptFriend,
};
