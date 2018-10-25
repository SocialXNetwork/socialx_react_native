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
		profileHandles.publicProfileByUsername(context, username).docLoad(
			(profile: IProfileCallbackData) => {
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
			},
			{ wait: 500, timeout: 1000 },
		);
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
	const currentAlias = context.account.is.alias;
	profileHandles
		.publicProfilesRecord(context)
		.find({ fullName: new RegExp(textSearch, 'i') }, (data: any) => {
			const profilesReturned = data
				.map((profile: any) => ({
					...profile,
					friends: friendsToArray(profile.friends) || [],
				}))
				.filter((profile: any) => profile.alias !== currentAlias);
			if (maxResults) {
				return callback(null, profilesReturned.slice(0, maxResults));
			}
			return callback(null, profilesReturned);
		});
};

export const findFriendsSuggestions = (
	context: IContext,
	{ maxResults }: { maxResults?: number },
	callback: IGunCallback<any[]>,
) => {
	profileHandles
		.currentUserProfileData(context)
		.docLoad((currentProfileCallback: IProfileCallbackData) => {
			if (
				!currentProfileCallback ||
				!Object.keys(currentProfileCallback).length
			) {
				return callback(new ApiError('failed to find current profile'));
			}
			const friendsData = friendsToArray(currentProfileCallback.friends) || [];
			profileHandles
				.publicProfilesRecord(context)
				.findFriendsSuggestions(
					currentProfileCallback.alias,
					friendsData,
					(data: any) => {
						const profilesReturned = data.map((profile: any) => ({
							...profile,
							friends: friendsToArray(profile.friends) || [],
						}));
						if (maxResults) {
							return callback(null, profilesReturned.slice(0, maxResults));
						}
						return callback(null, profilesReturned);
					},
				);
		});
};

export default {
	getCurrentProfile,
	getProfileByUsername,
	getPublicKeyByUsername,
	getCurrentProfileFriends,
	findProfilesByFullName,
	findFriendsSuggestions,
};
