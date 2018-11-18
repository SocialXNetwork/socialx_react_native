import { IContext, IGunCallback, IMetasTypeCallback, TABLE_ENUMS, TABLES } from '../../types';
import * as profileHandles from './handles';

import { ApiError } from '../../utils/errors';
import { cleanGunMetaFromObject, convertGunSetToArray } from '../../utils/helpers';
import {
	FRIEND_TYPES,
	IFriendData,
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

const getProfileNumberOfFriends = (
	context: IContext,
	profile: IProfileData,
	callback: (numberOfFriends: number) => void,
) => {
	profileHandles
		.privateUserFriendsRecordByPub(context, profile.pub)
		.once((friendsRecord: IMetasTypeCallback<IProfileData>) => {
			if (!friendsRecord) {
				callback(0);
			}
			const num = convertGunSetToArray(friendsRecord).length - 1;
			callback(num);
		});
};

const asyncFriendWithMutualStatus = (
	context: IContext,
	friend: IProfileData,
	check: boolean = false,
) =>
	new Promise<IFriendData>((res) => {
		const { pub, alias } = friend;
		const dataResolver = (noStatusCheck?: boolean) => {
			if (noStatusCheck) {
				getProfileNumberOfFriends(context, friend, (numberOfFriends) => {
					res({
						...friend,
						status: FRIEND_TYPES.NOT_FRIEND,
						numberOfFriends,
					});
				});
			} else {
				profileHandles.currentUserOnPrivateProfilesFriends(context, { pub, alias }).once(
					(currentUserProfile: IProfileData | undefined) => {
						if (!currentUserProfile) {
							getProfileNumberOfFriends(context, friend, (numberOfFriends) => {
								res({
									...friend,
									status: FRIEND_TYPES.PENDING,
									numberOfFriends,
								});
							});
						} else {
							getProfileNumberOfFriends(context, friend, (numberOfFriends) => {
								res({
									...friend,
									status: FRIEND_TYPES.MUTUAL,
									numberOfFriends,
								});
							});
						}
					},
					{ wait: 300 },
				);
			}
		};
		if (check) {
			profileHandles
				.currentProfileFriendByUsername(context, alias)
				.once((friendDataCallback: IProfileData) => {
					if (!friendDataCallback) {
						dataResolver(true);
					} else {
						dataResolver(false);
					}
				});
		} else {
			dataResolver(false);
		}
	});

const friendWithMutualStatus = (
	context: IContext,
	friend: IProfileData,
	callback: (friend: IFriendData) => void,
) => {
	const { pub, alias } = friend;
	const mainRunner = () => {
		profileHandles.currentUserOnPrivateProfilesFriends(context, { pub, alias }).once(
			(currentUserProfile: IProfileData | undefined) => {
				if (!currentUserProfile) {
					getFriendProfile(FRIEND_TYPES.PENDING);
				} else {
					getFriendProfile(FRIEND_TYPES.MUTUAL);
				}
			},
			{ wait: 400 },
		);
	};

	const getFriendProfile = (status: FRIEND_TYPES) => {
		getProfileNumberOfFriends(context, friend, (numberOfFriends) => {
			callback({
				...friend,
				status,
				numberOfFriends,
			});
		});
	};
	mainRunner();
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
	callback: IGunCallback<IFriendData>,
) => {
	const mainRunner = () => {
		profileHandles.currentProfileFriendByUsername(context, username).once(
			(checkFriendCallback: IProfileData) => {
				if (!checkFriendCallback) {
					fetchPublicUser();
				} else {
					const friendData = cleanGunMetaFromObject(checkFriendCallback);
					friendWithMutualStatus(context, friendData, (friend) => {
						callback(null, friend);
					});
				}
			},
			{ wait: 400 },
		);
	};
	const fetchPublicUser = () => {
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

				getProfileNumberOfFriends(context, cleanedProfile, (numberOfFriends) => {
					return callback(null, {
						...cleanedProfile,
						status: FRIEND_TYPES.NOT_FRIEND,
						numberOfFriends,
					});
				});
			},
			{ wait: 400 },
		);
	};
	mainRunner();
};

export const getProfileByUserObject = (
	context: IContext,
	userObject: IUserObject,
	callback: IGunCallback<IFriendData>,
) => {
	const mainRunner = () => {
		profileHandles.currentProfileFriendByUsername(context, userObject.alias).once(
			(checkFriendCallback: IProfileData) => {
				if (!checkFriendCallback) {
					fetchPublicUser();
				} else {
					const friendData = cleanGunMetaFromObject(checkFriendCallback);
					friendWithMutualStatus(context, friendData, (friend) => {
						callback(null, friend);
					});
				}
			},
			{ wait: 400 },
		);
	};
	const fetchPublicUser = () => {
		profileHandles.privateUserProfileByUserObj(context, userObject).open(
			(profileDataCallback: IProfileData) => {
				const profileData = cleanGunMetaFromObject(profileDataCallback);
				getProfileNumberOfFriends(context, profileData, (numberOfFriends) => {
					return callback(null, {
						...profileData,
						status: FRIEND_TYPES.NOT_FRIEND,
						numberOfFriends,
					});
				});
			},
			{ off: 1 },
		);
	};
	mainRunner();
};

export const getCurrentProfileFriends = async (
	context: IContext,
	callback: IGunCallback<IProfileData[]>,
) => {
	profileHandles.currentProfileFriendsRecord(context).once((data: any) => {
		if (!data) {
			return callback(null, []);
		}

		profileHandles.currentProfileFriendsRecord(context).open(
			(friendsRecordCallback: IFriendsCallbackData) => {
				if (!Object.keys(friendsRecordCallback).length) {
					// no friends, sadlife
					return callback(null, []);
				}

				// convert to array, and filter out the user removed friends
				const sanitizedFriendsArray: IProfileData[] = convertGunSetToArray(
					friendsRecordCallback,
				).filter((friend) => friend !== null);

				return callback(null, sanitizedFriendsArray);
			},
			{ wait: 400, off: 1 },
		);
	});
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
	asyncFriendWithMutualStatus,
};
