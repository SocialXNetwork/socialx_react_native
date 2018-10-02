import { IContext, IGunCallback } from '../../types';
import * as profileHandles from './handles';

import {
	cleanGunMetaFromObject,
	convertGunSetToArrayWithKey,
} from '../../utils/helpers';
import {
	IFriendData,
	IFriendReturnData,
	IFriendsCallbackData,
	IGetPublicKeyInput,
	IProfileCallbackData,
	IProfileData,
} from './types';

// * this is used internally, do not remove
export const getPublicKeyByUsername = (
	context: IContext,
	{ username }: IGetPublicKeyInput,
	callback: IGunCallback<string>,
) => {
	profileHandles
		.profileByUsername(context, username)
		.docLoad(({ pub }: IProfileCallbackData) => {
			return callback(null, pub);
		});
};

const friendsToArray = (friends: IFriendsCallbackData) =>
	convertGunSetToArrayWithKey(friends).map(
		({ k, ...friend }: IFriendData & { k: string }) => ({
			friendId: k,
			...friend,
		}),
	);

export const getCurrentProfile = (
	context: IContext,
	callback: IGunCallback<IProfileData>,
) => {
	const { account } = context;
	if (!account.is) {
		return callback('a user needs to be logged in to proceed');
	}

	profileHandles
		.currentUserProfile(context)
		.docLoad((profile: IProfileCallbackData) => {
			if (!profile) {
				return callback('no user profile found');
			}
			const { friends, username, ...profileRest } = profile;

			const cleanedProfile = cleanGunMetaFromObject(profileRest);
			const friendsData = friendsToArray(friends) || [];
			const profileReturnData = {
				friends: friendsData,
				...cleanedProfile,
			};
			return callback(null, profileReturnData);
		});
};

export const getProfileByUsername = (
	context: IContext,
	{ username }: { username: string },
	callback: IGunCallback<IProfileCallbackData>,
) => {
	profileHandles
		.profileByUsername(context, username)
		.docLoad((profile: IProfileCallbackData) => {
			if (!profile) {
				return callback('no user profile found');
			}
			const { friends, ...profileRest } = profile;

			const cleanedProfile = cleanGunMetaFromObject(profileRest);

			const friendsData = friendsToArray(friends);
			const profileReturnData = {
				friends: friendsData,
				...cleanedProfile,
			};
			return callback(null, profileReturnData);
		});
};

// ? this is not needed anymore, should exist?
export const getCurrentProfileFriends = (
	context: IContext,
	callback: IGunCallback<IFriendReturnData[]>,
) => {
	profileHandles
		.currentProfileFriends(context)
		.docLoad((friends: IFriendsCallbackData) => {
			if (!friends) {
				return callback('failed, no friends found :(');
			}

			const friendsData = friendsToArray(friends);

			return callback(null, friendsData);
		});
};

export default {
	getCurrentProfile,
	getProfileByUsername,
	getPublicKeyByUsername,
	getCurrentProfileFriends,
};
