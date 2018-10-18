import { IContext, IGunCallback, TABLES } from '../../types';
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

export const createProfile = (
	context: IContext,
	createProfileInput: ICreateProfileInput,
	callback: IGunCallback<null>,
) => {
	const { username, ...rest } = createProfileInput;
	profileHandles
		.profileByUsername(context, username)
		.put({ ...rest, alias: username }, (profileCallback) => {
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

export const updateProfile = (
	context: IContext,
	updateProfileInput: IUpdateProfileInput,
	callback: IGunCallback<null>,
) => {
	profileHandles
		.currentUserProfile(context)
		.put(updateProfileInput, (updateCallback) => {
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

export const addFriend = (
	context: IContext,
	{ username }: IAddFriendInput,
	callback: IGunCallback<null>,
) => {
	const { owner, timestamp } = getContextMeta(context);
	const errPrefix = 'failed to add friend';
	if (owner === username) {
		return callback(
			new ApiError(`${errPrefix}, can not add self`, {
				initialRequestBody: { username },
			}),
		);
	}

	// dynamic username data builder
	const setFriendData = (setUsername: string) => ({
		username: setUsername,
		timestamp,
		relation: FRIEND_TYPES.PENDING,
	});

	const relationshipId = uuidv4();

	profileHandles
		.currentProfileFriendship(context, relationshipId)
		.put(setFriendData(username), (addFriendCallback) => {
			if (addFriendCallback.err) {
				return callback(
					new ApiError(
						`${errPrefix}, current user friendship not updated ${
							addFriendCallback.err
						}`,
						{
							initialRequestBody: { username },
						},
					),
				);
			}

			// emulate a .set to achive mutual id, this will make accepting
			// the friendship 2 operations less
			profileHandles
				.userProfileFriendship(context, username, relationshipId)
				.put(setFriendData(owner), (targetAddFriendCallback) => {
					if (targetAddFriendCallback.err) {
						return callback(
							new ApiError(
								`${errPrefix}, target user friendship not updated ${
									targetAddFriendCallback.err
								}`,
								{
									initialRequestBody: { username },
								},
							),
						);
					}
					return callback(null);
				});
		});
};
export const removeFriend = (
	context: IContext,
	{ friendshipId, username }: IRemoveFriendInput,
	callback: IGunCallback<null>,
) => {
	const errPrefix = 'failed to remove friend';
	profileHandles
		.currentProfileFriends(context)
		.get(friendshipId)
		.put(null, (removeFriendCallback) => {
			if (removeFriendCallback.err) {
				return callback(
					new ApiError(
						`${errPrefix}, failed to remove current user friendship ${
							removeFriendCallback.err
						}`,
						{
							initialRequestBody: { username, friendshipId },
						},
					),
				);
			}
			profileHandles
				.profileFriendsByUsername(context, username)
				.get(friendshipId)
				.put(null, (targetRemoveFriendCallback) => {
					if (targetRemoveFriendCallback.err) {
						return callback(
							new ApiError(
								`${errPrefix}, failed to remove target relationship ${
									targetRemoveFriendCallback.err
								}`,
								{
									initialRequestBody: { username, friendshipId },
								},
							),
						);
					}
					return callback(null);
				});
		});
};

export const acceptFriend = (
	context: IContext,
	{ friendshipId, username }: IAcceptFriendInput,
	callback: IGunCallback<null>,
) => {
	const errPrefix = 'failed to accept friend';
	profileHandles
		.currentProfileFriendship(context, friendshipId)
		.put({ relation: FRIEND_TYPES.MUTUAL }, (targetAcceptCallback) => {
			if (targetAcceptCallback.err) {
				return callback(
					new ApiError(
						`${errPrefix}, failed to update current user friendship ${
							targetAcceptCallback.err
						}`,
						{
							initialRequestBody: { username, friendshipId },
						},
					),
				);
			}
			// ! this is not working? its like the target is an empty object
			profileHandles
				.userProfileFriendship(context, username, friendshipId)
				.put({ relation: FRIEND_TYPES.MUTUAL }, (acceptFriendCallback) => {
					if (acceptFriendCallback.err) {
						return callback(
							new ApiError(
								`${errPrefix}, failed to update target user friendship ${
									acceptFriendCallback.err
								}`,
								{
									initialRequestBody: { username, friendshipId },
								},
							),
						);
					}
					return callback(null);
				});
		});
};

export default {
	createProfile,
	updateProfile,
	addFriend,
	removeFriend,
	acceptFriend,
};
