import { IContext, IGunCallback, IMetasTypeCallback, TABLE_ENUMS, TABLES } from '../../types';
import * as profileHandles from './handles';

import { ApiError } from '../../utils/errors';
import { cleanGunMetaFromObject, convertGunSetToArray, getContextMeta } from '../../utils/helpers';
import {
	FRIEND_TYPES,
	IFindFriendsSuggestionsInput,
	IFriendData,
	IFriendsCallbackData,
	IGetPublicKeyInput,
	IProfileCallbackData,
	IProfileData,
	ISearchProfilesByFullNameInput,
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
	profileHandles.privateUserFriendsByAlias(context, profile.alias).once(
		(friendsRecord: IMetasTypeCallback<IProfileData>) => {
			if (!friendsRecord) {
				return callback(0);
			}

			const { _, ...rest } = friendsRecord;
			const num = convertGunSetToArray(rest).filter((friend) => friend !== null).length - 1;
			callback(num);
		},
		{ wait: 1000 },
	);
};

const asyncFriendWithMutualStatus = (
	context: IContext,
	friend: IProfileData,
	check: boolean = false,
) =>
	new Promise<IFriendData>((res) => {
		const { pub, alias } = friend;
		const { owner } = getContextMeta(context);
		const dataResolver = (noStatusCheck?: boolean) => {
			if (noStatusCheck) {
				getProfileNumberOfFriends(context, friend, (numberOfFriends) => {
					res({
						...friend,
						status: FRIEND_TYPES.NOT_FRIEND,
						numberOfFriends,
						posts: [],
					});
				});
			} else {
				profileHandles.privateMutualUserFriends(context, alias, owner).once(
					(currentUserProfile: IProfileData | undefined) => {
						if (!currentUserProfile) {
							getProfileNumberOfFriends(context, friend, (numberOfFriends) => {
								res({
									...friend,
									status: FRIEND_TYPES.PENDING,
									numberOfFriends,
									posts: [],
								});
							});
						} else {
							getProfileNumberOfFriends(context, friend, (numberOfFriends) => {
								res({
									...friend,
									status: FRIEND_TYPES.MUTUAL,
									numberOfFriends,
									posts: [],
								});
							});
						}
					},
					{ wait: 1000 },
				);
			}
		};
		const mainCheck = () => {
			if (check) {
				profileHandles.currentProfileFriendByUsername(context, alias).once(
					(friendDataCallback: IProfileData) => {
						if (!friendDataCallback) {
							dataResolver(true);
						} else {
							dataResolver(false);
						}
					},
					{ wait: 500 },
				);
			} else {
				dataResolver(false);
			}
		};
		mainCheck();
	});

const friendWithMutualStatus = (
	context: IContext,
	friend: IProfileData,
	callback: (friend: IFriendData) => void,
) => {
	const { pub, alias } = friend;
	const { owner } = getContextMeta(context);
	const mainRunner = () => {
		profileHandles.privateMutualUserFriends(context, alias, owner).once(
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
				posts: [],
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
			getProfileNumberOfFriends(context, sanitizedProfile, (numberOfFriends) => {
				return callback(null, { ...sanitizedProfile, numberOfFriends, posts: [] });
			});
		},
		{ wait: 2000 },
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
					if (!Object.keys(friendData).length) {
						fetchPublicUser();
					} else {
						friendWithMutualStatus(context, friendData, (friend) => {
							callback(null, friend);
						});
					}
				}
			},
			{ wait: 1000 },
		);
	};
	const fetchPublicUser = () => {
		profileHandles.publicProfileByUsername(context, username).once(
			(profile: IProfileCallbackData) => {
				if (!profile || !Object.keys(profile).length) {
					fetchPrivateUserBackup();
				} else {
					const cleanedProfile = cleanGunMetaFromObject(profile);

					getProfileNumberOfFriends(context, cleanedProfile, (numberOfFriends) => {
						return callback(null, {
							...cleanedProfile,
							status: FRIEND_TYPES.NOT_FRIEND,
							numberOfFriends,
						});
					});
				}
			},
			{ wait: 1000 },
		);
	};
	// failsafe
	const fetchPrivateUserBackup = () => {
		const { gun: dgun } = context;
		const gun = dgun.back(-1);
		const extractProf = (data: any) => {
			if (!data) {
				return callback(new ApiError('failed to fetch the profile'));
			}
			const act = Object.keys(data).filter((key) => key !== '_');
			// tslint:disable-next-line
			for (let i = 0; i < act.length; i++){
				const pub = act[i];
				gun
					.get(pub)
					.get(TABLES.PROFILE)
					.get(username)
					.once((profile: any) => {
						if (profile) {
							friendWithMutualStatus(context, profile, (friend) => {
								callback(null, friend);
							});
						}
					});
			}
		};
		gun.get(`~@${username}`).once(extractProf, { wait: 10000 });
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
					if (!Object.keys(friendData).length) {
						fetchPublicUser();
					} else {
						friendWithMutualStatus(context, friendData, (friend) => {
							callback(null, friend);
						});
					}
				}
			},
			{ wait: 1000 },
		);
	};
	const fetchPublicUser = () => {
		profileHandles.privateUserProfileByUserObj(context, userObject).once(
			(data: any) => {
				// very rare case
				if (!data) {
					fetchPublicUserRecord();
				} else {
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
						{ off: 1, wait: 1000 },
					);
				}
			},
			{ wait: 2000 },
		);
	};

	const fetchPublicUserRecord = () => {
		profileHandles.publicProfileByUsername(context, userObject.alias).once(
			(publicUserProfileCallback: IProfileData) => {
				const profileData = cleanGunMetaFromObject(publicUserProfileCallback);
				return callback(null, {
					...profileData,
					alias: userObject.alias,
					fullName: 'sketchy',
					avatar: '',
					status: FRIEND_TYPES.NOT_FRIEND,
					numberOfFriends: 0,
					sketchyProfile: true,
					aboutMeText: 'about me text',
					email: '',
					pub: 'sketchy0xA9ECF',
					miningEnabled: true,
				});
			},
			{ wait: 1000 },
		);
	};
	mainRunner();
};

export const getCurrentProfileFriends = async (
	context: IContext,
	callback: IGunCallback<IProfileData[]>,
) => {
	profileHandles.privateUserFriendsRecord(context).once(
		(data: any) => {
			if (!data) {
				return callback(null, []);
			}

			profileHandles.privateUserFriendsRecord(context).open(
				(friendsRecordCallback: IFriendsCallbackData) => {
					if (!Object.keys(friendsRecordCallback).length) {
						// no friends, sadlife
						return callback(null, []);
					}

					// convert to array, and filter out the user removed friends
					const sanitizedFriendsArray: IProfileData[] = convertGunSetToArray(
						friendsRecordCallback,
					).filter((friend) => friend !== null && !!Object.keys(friend).length);

					setTimeout(() => {
						return callback(null, sanitizedFriendsArray);
					}, 500);
				},
				{ wait: 10000, off: 1 },
			);
		},
		{ wait: 1000 },
	);
};

export const getProfileFriendsByAlias = async (
	context: IContext,
	{ alias }: { alias: string },
	callback: IGunCallback<IProfileData[]>,
) => {
	profileHandles.privateUserFriendsByAlias(context, alias).once(
		(data: any) => {
			if (!data) {
				return callback(null, []);
			}

			profileHandles.privateUserFriendsByAlias(context, alias).open(
				(friendsDataCallback: IProfileCallbackData | any) => {
					if (!Object.keys(friendsDataCallback).length) {
						return callback(null, []);
					}

					const sanitizedFriendsArray = convertGunSetToArray(friendsDataCallback).filter(
						(friend) => friend !== null && !!Object.keys(friend).length,
					);

					return callback(null, sanitizedFriendsArray);
				},
				{ wait: 10000, off: 1 },
			);
		},
		{ wait: 1000 },
	);
};

export const findProfilesByFullName = (
	context: IContext,
	args: ISearchProfilesByFullNameInput,
	callback: IGunCallback<any[]>,
) => {
	const { owner } = getContextMeta(context);
	const { term, limit } = args;

	profileHandles.publicProfilesRecord(context).find(term, (data: any) => {
		if (!data) {
			return callback(null, []);
		}

		const profilesReturned = data.filter((profile: any) => profile.alias !== owner);

		if (profilesReturned.length <= 0) {
			return callback(null, []);
		}
		if (term) {
			return callback(null, profilesReturned.slice(0, limit));
		}
		return callback(null, profilesReturned);
	});
};

export const findFriendsSuggestions = (
	context: IContext,
	args: IFindFriendsSuggestionsInput,
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
	getProfileFriendsByAlias,
};
