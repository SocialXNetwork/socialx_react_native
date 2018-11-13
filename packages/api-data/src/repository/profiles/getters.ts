import { IContext, IGunCallback, TABLE_ENUMS, TABLES } from '../../types';
import * as profileHandles from './handles';

import { ApiError } from '../../utils/errors';
import { cleanGunMetaFromObject, convertGunSetToArray } from '../../utils/helpers';
import {
	IFriendReturnData,
	IFriendsCallbackData,
	IGetPublicKeyInput,
	IProfileCallbackData,
	IProfileData,
	IUserObject,
} from './types';

const preLoadProfiles = (gun: any, cb: any) => {
	gun.get(TABLES.POSTS).once(() => {
		cb();
	});
};

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

export const getCurrentProfile = (context: IContext, callback: IGunCallback<IProfileData>) => {
	profileHandles.currentUserProfileData(context).once(
		(currentProfileData: IProfileData) => {
			if (!currentProfileData) {
				return callback(new ApiError('failed to fetch the current profile'));
			}
			const sanitizedProfile = cleanGunMetaFromObject(currentProfileData);
			return callback(null, sanitizedProfile);
		},
		{ wait: 400 },
	);
};

export const getProfileByUsername = (
	context: IContext,
	{ username }: { username: string },
	callback: IGunCallback<IProfileCallbackData>,
) => {
	const mainRunner = () => {
		profileHandles.publicProfileByUsername(context, username).once(
			(profile: IProfileCallbackData) => {
				if (!profile || !Object.keys(profile).length) {
					return callback(
						new ApiError('failed to find profile', {
							initialRequestBody: { username },
						}),
					);
				}

				const cleanedProfile = cleanGunMetaFromObject(profile);

				return callback(null, cleanedProfile);
			},
			{ wait: 400 },
		);
	};
	mainRunner();
};

export const getProfileByUserObject = (
	context: IContext,
	userObject: IUserObject,
	callback: IGunCallback<IProfileData>,
) => {
	profileHandles.privateUserProfileByUserObj(context, userObject).open(
		(profileData: IProfileData) => {
			return callback(null, profileData);
		},
		{ off: 1 },
	);
};

export const getCurrentProfileFriends = (
	context: IContext,
	callback: IGunCallback<IFriendReturnData[]>,
) => {
	profileHandles.currentProfileFriendsRecord(context).docLoad(
		(friendsRecordCallback: IFriendsCallbackData) => {
			if (!Object.keys(friendsRecordCallback).length) {
				// no friends, sadlife
				return callback(null, []);
			}
			const sanitizedFriendsArray = convertGunSetToArray(friendsRecordCallback);
			return callback(null, sanitizedFriendsArray.filter((friend) => friend !== null));
		},
		{ wait: 400, timeout: 800 },
	);
};

// ? needs review
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
	// OUTDATED!!
	return callback(null, []);
	// profileHandles
	// 	.currentUserProfileData(context)
	// 	.docLoad((currentProfileCallback: IProfileCallbackData) => {
	// 		if (!currentProfileCallback || !Object.keys(currentProfileCallback).length) {
	// 			return callback(new ApiError('failed to find current profile'));
	// 		}
	// 		const friendsData = friendsToArray(currentProfileCallback.friends) || [];
	// 		profileHandles
	// 			.publicProfilesRecord(context)
	// 			.findFriendsSuggestions(currentProfileCallback.alias, friendsData, (data: any) => {
	// 				const profilesReturned = data.map((profile: any) => ({
	// 					...profile,
	// 					friends: friendsToArray(profile.friends) || [],
	// 				}));
	// 				if (maxResults) {
	// 					return callback(null, profilesReturned.slice(0, maxResults));
	// 				}
	// 				return callback(null, profilesReturned);
	// 			});
	// 	});
};

export default {
	getCurrentProfile,
	getProfileByUsername,
	getPublicKeyByUsername,
	getCurrentProfileFriends,
	findProfilesByFullName,
	findFriendsSuggestions,
	getProfileByUserObject,
};
