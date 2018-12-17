import { IContext } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';

import {
	IAcceptFriendInput,
	IAddFriendInput,
	IClearFriendRequestInput,
	IClearFriendResponseInput,
	ICreateProfileInput,
	IFindFriendsSuggestionsInput,
	IFriendData,
	IFriendsCallbackData,
	IGetPublicKeyInput,
	IProfileData,
	IReadFriendRequestInput,
	IRejectFriendInput,
	IRemoveFriendInput,
	ISearchProfilesByFullNameInput,
	IUpdateProfileInput,
	IUserObject,
} from './types';

import { ValidationError } from '../../utils/errors';
import { getRelatedUserObjectsFromPosts, resolveCallback, unique } from '../../utils/helpers';
import { IPostArrayData } from '../posts/types';

export default (context: IContext) => ({
	createProfile: async (createProfileInput: ICreateProfileInput): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.createProfileInput.validate(createProfileInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: createProfileInput,
			});
		}
		return new Promise<null>((resolve, reject) => {
			setters.createProfile(
				context,
				validatedInput as ICreateProfileInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	getCurrentProfile: (): Promise<IProfileData> =>
		new Promise((resolve, reject) => {
			getters.getCurrentProfile(context, resolveCallback(resolve, reject));
		}),
	async getProfilesByUsernames(getProfilesByUsernamesInput: {
		usernames: string[];
	}): Promise<IFriendData[]> {
		let validatedInput: any;
		try {
			validatedInput = await schemas.getProfilesByUsernames.validate(getProfilesByUsernamesInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: getProfilesByUsernamesInput,
			});
		}

		const { usernames } = getProfilesByUsernamesInput;
		return Promise.all(usernames.map((username) => this.getProfileByUsername({ username })));
	},
	async getProfileByUserObject(userObject: IUserObject): Promise<IProfileData> {
		return new Promise<IProfileData>((res, rej) => {
			getters.getProfileByUserObject(context, userObject, resolveCallback(res, rej));
		});
	},
	async getProfilesByUserObjects(userObjects: IUserObject[]): Promise<IProfileData[]> {
		const uniqueUsers = userObjects.filter(
			(v, i, self) => i === self.findIndex((o) => o.alias === v.alias && o.pub === v.pub),
		);
		return Promise.all(uniqueUsers.map((userOb) => this.getProfileByUserObject(userOb)));
	},
	async getUserProfilesByPosts({ posts }: { posts: IPostArrayData }): Promise<IProfileData[]> {
		// TODO: finish
		// let validatedInput: any;
		// try {
		// 	validatedInput = await schemas.createProfileInput.validate(
		// 		createProfileInput,
		// 		{
		// 			stripUnknown: true,
		// 		},
		// 	);
		// } catch (e) {
		// 	throw new ValidationError(
		// 		typeof e.errors === 'string' ? e.errors : e.errors.join(),
		// 		{ validationInput: createProfileInput },
		// 	);
		// }
		// const usernames = unique(getRelatedUsernamesFromPosts(posts) || []).filter((v) => v.length);
		// return this.getProfilesByUsernames({ usernames });
		const userObjects: IUserObject[] = (getRelatedUserObjectsFromPosts(posts) || []).filter(
			(v: object) => !!Object.keys(v).length,
		);
		return this.getProfilesByUserObjects(userObjects);
		//
	},
	async getProfileByUsername(getProfileByUsernameInput: {
		username: string;
	}): Promise<IFriendData> {
		let validatedInput: any;
		try {
			validatedInput = await schemas.getProfileByUsername.validate(getProfileByUsernameInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: getProfileByUsernameInput,
			});
		}

		return new Promise<IFriendData>((resolve, reject) => {
			getters.getProfileByUsername(
				context,
				validatedInput as { username: string },
				resolveCallback(resolve, reject),
			);
		});
	},
	getPublicKeyByUsername: async (
		getPublicKeyByUsernameInput: IGetPublicKeyInput,
	): Promise<string> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.getProfileByUsername.validate(getPublicKeyByUsernameInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: getPublicKeyByUsernameInput,
			});
		}

		return new Promise<string>((resolve, reject) => {
			getters.getPublicKeyByUsername(
				context,
				validatedInput as IGetPublicKeyInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	updateProfile: async (updateProfileInput: IUpdateProfileInput): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.updateProfile.validate(updateProfileInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: updateProfileInput,
			});
		}

		return new Promise<null>((resolve, reject) => {
			setters.updateProfile(
				context,
				validatedInput as IUpdateProfileInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	addFriend: async (addFriendInput: IAddFriendInput): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.addFriend.validate(addFriendInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: addFriendInput,
			});
		}
		return new Promise<null>((resolve, reject) => {
			setters.addFriend(
				context,
				validatedInput as IAddFriendInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	removeFriend: async (removeFriendInput: IRemoveFriendInput): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.removeFriend.validate(removeFriendInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: removeFriendInput,
			});
		}

		return new Promise<null>((resolve, reject) => {
			setters.removeFriend(
				context,
				validatedInput as IRemoveFriendInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	acceptFriend: async (acceptFriendInput: IAcceptFriendInput): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.acceptFriend.validate(acceptFriendInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: acceptFriendInput,
			});
		}

		return new Promise<null>((resolve, reject) => {
			setters.acceptFriend(
				context,
				validatedInput as IAcceptFriendInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	rejectFriend: async (rejectFriendInput: IRejectFriendInput): Promise<null> => {
		let validatedInput: any;
		try {
			// same check
			validatedInput = await schemas.acceptFriend.validate(rejectFriendInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: rejectFriendInput,
			});
		}

		return new Promise<null>((resolve, reject) => {
			setters.rejectFriend(
				context,
				validatedInput as IRejectFriendInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	clearFriendResponse: async (clearResponseInput: IClearFriendResponseInput) => {
		return new Promise<null>((resolve, reject) => {
			setters.clearFriendResponse(context, clearResponseInput, resolveCallback(resolve, reject));
		});
	},
	clearFriendRequest: async (clearRequestInput: IClearFriendRequestInput) => {
		return new Promise<null>((resolve, reject) => {
			setters.clearFriendRequest(context, clearRequestInput, resolveCallback(resolve, reject));
		});
	},
	readFriendRequests: async (input: IReadFriendRequestInput) => {
		return new Promise<null>((resolve, reject) => {
			setters.readFriendRequests(context, input, resolveCallback(resolve, reject));
		});
	},
	readFriendResponses: async (input: IReadFriendRequestInput) => {
		return new Promise<null>((resolve, reject) => {
			setters.readFriendResponses(context, input, resolveCallback(resolve, reject));
		});
	},
	getCurrentProfileFriends: (): Promise<IFriendData[]> =>
		new Promise((resolve) => {
			getters.getCurrentProfileFriends(context, async (err, friends) => {
				if (friends) {
					const finalFriends = await Promise.all(
						friends.map((friend) => getters.asyncFriendWithMutualStatus(context, friend)),
					);
					resolve(finalFriends);
				} else {
					resolve([]);
				}
			});
		}),
	searchByFullName: ({
		term,
		limit = 10,
	}: ISearchProfilesByFullNameInput): Promise<IProfileData[]> =>
		new Promise((resolve) => {
			if (!term || !term.length || typeof term !== 'string') {
				resolve([]);
			}
			getters.findProfilesByFullName(context, { term, limit }, async (err, result) => {
				if (result) {
					const finalProfiles = await Promise.all(
						result.map((user) => getters.asyncFriendWithMutualStatus(context, user, true)),
					);
					resolve(finalProfiles);
				} else {
					resolve([]);
				}
			});
		}),
	findFriendsSuggestions: ({ limit = 10 }: IFindFriendsSuggestionsInput): Promise<IProfileData[]> =>
		new Promise((resolve, reject) =>
			getters.findFriendsSuggestions(context, { limit }, resolveCallback(resolve, reject)),
		),
});
