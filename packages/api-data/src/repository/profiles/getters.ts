import { IContext, IGunCallback } from '../../types';
import * as profileHandles from './handles';

import { IFriendsReturnData, IGetPublicKeyInput, IProfile } from './types';

export const getPublicKeyByUsername = (
	context: IContext,
	{ username }: IGetPublicKeyInput,
	callback: IGunCallback<string>,
) => {
	profileHandles
		.profileByUsername(context, username)
		.docLoad(({ pub }: IProfile) => {
			return callback(null, pub);
		});
};

export const getCurrentProfile = (
	context: IContext,
	callback: IGunCallback<IProfile>,
) => {
	const { account } = context;
	if (!account.is) {
		return callback('a user needs to be logged in to proceed');
	}

	profileHandles.currentUserProfile(context).docLoad((profile: IProfile) => {
		if (!profile) {
			return callback('no user profile found');
		}

		return callback(null, profile);
	});
};

export const getProfileByUsername = (
	context: IContext,
	{ username }: { username: string },
	callback: IGunCallback<IProfile>,
) => {
	profileHandles
		.profileByUsername(context, username)
		.docLoad((profile: IProfile) => {
			if (!profile) {
				return callback('no user profile found');
			}

			return callback(null, profile);
		});
};

export const getCurrentProfileFriends = (
	context: IContext,
	callback: IGunCallback<IFriendsReturnData>,
) => {
	profileHandles
		.currentProfileFriends(context)
		.docLoad((data: IFriendsReturnData) => {
			if (!data) {
				return callback('failed, no friends found :(');
			}
			return callback(null, data);
		});
};

export default {
	getCurrentProfile,
	getProfileByUsername,
	getPublicKeyByUsername,
	getCurrentProfileFriends,
};
