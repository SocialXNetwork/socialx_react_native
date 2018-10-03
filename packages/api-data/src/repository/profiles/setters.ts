import { IContext, IGunCallback, TABLES } from '../../types';
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
	if (owner === username) {
		return callback('failed, cannot add self as a friend');
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
				return callback('failed, error => ' + addFriendCallback.err);
			}

			// emulate a .set to achive mutual id, this will make accepting
			// the friendship 2 operations less
			profileHandles
				.userProfileFriendship(context, username, relationshipId)
				.put(setFriendData(owner), (targetAddFriendCallback) => {
					if (targetAddFriendCallback.err) {
						return callback('failed, error => ' + targetAddFriendCallback.err);
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
		.currentProfileFriendship(context, friendshipId)
		.put({ relation: FRIEND_TYPES.MUTUAL }, (targetAcceptCallback) => {
			if (targetAcceptCallback.err) {
				return callback('failed, error => ' + targetAcceptCallback.err);
			}
			// ! this is not working? its like the target is an empty object
			profileHandles
				.userProfileFriendship(context, username, friendshipId)
				.put({ relation: FRIEND_TYPES.MUTUAL }, (acceptFriendCallback) => {
					if (acceptFriendCallback.err) {
						return callback('failed, error => ' + acceptFriendCallback.err);
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
