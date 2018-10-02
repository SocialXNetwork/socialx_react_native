import { IContext, IGunCallback } from '../../types';
import * as profileHandles from './handles';

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
		.put({ ...rest }, (profileCallback) => {
			if (profileCallback.err) {
				return callback('failed, error => ' + profileCallback.err);
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
				return callback('failed, error => ' + updateCallback.err);
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
	// dynamic username data builder
	const setFriendData = (setUsername: string) => ({
		username: setUsername,
		timestamp,
		relation: FRIEND_TYPES.PENDING,
	});

	profileHandles
		.currentProfileFriends(context)
		.set(setFriendData(username), (addFriendCallback) => {
			if (addFriendCallback.err) {
				return callback('failed, error => ' + addFriendCallback.err);
			}

			const mutualRelationId = addFriendCallback['#'];
			// emulate a .set to achive mutual id, this will make accepting
			// the friendship 2 operations less
			profileHandles.profileFriendsByUsername(context, username).put(
				{
					[mutualRelationId]: setFriendData(owner),
				},
				(targetAddFriendCallback) => {
					if (targetAddFriendCallback.err) {
						return callback('failed, error => ' + targetAddFriendCallback.err);
					}
					return callback(null);
				},
			);
		});
};
export const removeFriend = (
	context: IContext,
	{ friendshipId, username }: IRemoveFriendInput,
	callback: IGunCallback<null>,
) => {
	profileHandles
		.currentProfileFriends(context)
		.get(friendshipId)
		.put(null, (removeFriendCallback) => {
			if (removeFriendCallback.err) {
				return callback('failed, error => ' + removeFriendCallback.err);
			}
			profileHandles
				.profileFriendsByUsername(context, username)
				.get(friendshipId)
				.put(null, (targetRemoveFriendCallback) => {
					if (targetRemoveFriendCallback.err) {
						return callback(
							'failed, error => ' + targetRemoveFriendCallback.err,
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
	profileHandles
		.currentProfileFriends(context)
		.get(friendshipId)
		.put({ relation: FRIEND_TYPES.MUTUAL }, (acceptFriendCallback) => {
			if (acceptFriendCallback.err) {
				return callback('failed, error => ' + acceptFriendCallback.err);
			}
			profileHandles
				.profileFriendsByUsername(context, username)
				.get(friendshipId)
				.put({ relation: FRIEND_TYPES.MUTUAL }, (targetAcceptCallback) => {
					if (targetAcceptCallback.err) {
						return callback('failed, error => ' + targetAcceptCallback.err);
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
