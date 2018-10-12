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
		return callback(
			new ApiError('failed to get current profile, user not logged in'),
		);
	}

	profileHandles
		.currentUserProfile(context)
		.docLoad((profile: IProfileCallbackData) => {
			if (!profile) {
				return callback(new ApiError('failed to find current profile'));
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

// ? this is not needed anymore, should exist?
export const getCurrentProfileFriends = (
	context: IContext,
	callback: IGunCallback<IFriendReturnData[]>,
) => {
	profileHandles
		.currentProfileFriends(context)
		.docLoad((friends: IFriendsCallbackData) => {
			if (!friends) {
				return callback(new ApiError('failed to find friends of current user'));
			}

			const friendsData = friendsToArray(friends);

			return callback(null, friendsData);
		});
};

export const findProfilesByFullName = (
	context: IContext,
	{ textSearch, maxResults }: { textSearch: string; maxResults?: number },
	callback: IGunCallback<any[]>,
) => {
	profileHandles.allProfiles(context).docLoad((data: any) => {
		const filteredData = Object.entries(data)
			.map(
				([username, profile]) =>
					data[username].fullName.match(new RegExp(textSearch, 'i'))
						? profile
						: null,
			)
			.filter((v) => v);
		if (maxResults && maxResults > 0) {
			return callback(null, filteredData.slice(0, maxResults));
		}
		return callback(null, filteredData);
	});
};

export default {
	getCurrentProfile,
	getProfileByUsername,
	getPublicKeyByUsername,
	getCurrentProfileFriends,
	findProfilesByFullName,
};
