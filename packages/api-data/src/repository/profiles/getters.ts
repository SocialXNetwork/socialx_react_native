import { IContext, IGunCallback, TABLES } from '../../types';
import * as profileHandles from './handles';

import { ApiError } from '../../utils/errors';
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
		.publicProfileByUsername(context, username)
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
		return callback(
			new ApiError('failed to get current profile, user not logged in'),
		);
	}
	/**
	 * get the current profile from the private scope
	 */
	const mainRunner = () => {
		profileHandles
			.currentUserProfileData(context)
			.docLoad((currentProfileCallback: IProfileCallbackData) => {
				if (!Object.keys(currentProfileCallback).length) {
					return callback(new ApiError('failed to find current profile'));
				}

				const { friends, username, ...profileRest } = currentProfileCallback;

				const cleanedProfile = cleanGunMetaFromObject(profileRest);
				const friendsData = friendsToArray(friends) || [];
				const profileReturnData = {
					friends: friendsData,
					...cleanedProfile,
				};
				return callback(null, profileReturnData);
			});
	};
	mainRunner();
};

export const getProfileByUsername = (
	context: IContext,
	{ username }: { username: string },
	callback: IGunCallback<IProfileCallbackData>,
) => {
	const mainRunner = () => {
		profileHandles
			.publicProfileByUsername(context, username)
			.docLoad((profile: IProfileCallbackData) => {
				if (!Object.keys(profile).length) {
					return callback(
						new ApiError('failed to find profile', {
							initialRequestBody: { username },
						}),
					);
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
	mainRunner();
};

// ? this is not needed anymore, should exist?
export const getCurrentProfileFriends = (
	context: IContext,
	callback: IGunCallback<IFriendReturnData[]>,
) => {
	//
};

export const findProfilesByFullName = (
	context: IContext,
	{ textSearch, maxResults }: { textSearch: string; maxResults?: number },
	callback: IGunCallback<any[]>,
) => {
	profileHandles
		.publicProfilesRecord(context)
		.find({ fullName: new RegExp(textSearch, 'i') }, (data: any) => {
			return callback(null, data);
		});
};

export default {
	getCurrentProfile,
	getProfileByUsername,
	getPublicKeyByUsername,
	getCurrentProfileFriends,
	findProfilesByFullName,
};
