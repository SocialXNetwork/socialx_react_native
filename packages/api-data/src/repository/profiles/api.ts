import { IContext } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';

import {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IFindFriendsSuggestionsInput,
	IFriendsCallbackData,
	IGetPublicKeyInput,
	IProfileCallbackData,
	IProfileData,
	IRemoveFriendInput,
	ISearchProfilesByFullNameInput,
	IUpdateProfileInput,
} from './types';

import { ValidationError } from '../../utils/errors';
import { getRelatedUsernamesFromPosts, resolveCallback, unique } from '../../utils/helpers';
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
	}): Promise<IProfileData[]> {
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
	//
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
		const usernames = unique(getRelatedUsernamesFromPosts(posts) || []);
		return this.getProfilesByUsernames({ usernames });
	},
	async getProfileByUsername(getProfileByUsernameInput: {
		username: string;
	}): Promise<IProfileData> {
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

		return new Promise<IProfileData>((resolve, reject) => {
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
	getCurrentProfileFriends: (): Promise<IFriendsCallbackData> =>
		new Promise((resolve, reject) => {
			getters.getCurrentProfileFriends(context, resolveCallback(resolve, reject));
		}),
	searchByFullName: ({
		textSearch,
		maxResults = 10,
	}: ISearchProfilesByFullNameInput): Promise<IProfileData[]> =>
		new Promise((resolve, reject) => {
			!textSearch || !textSearch.length || typeof textSearch !== 'string'
				? resolve([])
				: getters.findProfilesByFullName(
						context,
						{ textSearch, maxResults },
						resolveCallback(resolve, reject),
				  ); // tslint:disable-line
		}),
	findFriendsSuggestions: ({
		maxResults = 10,
	}: IFindFriendsSuggestionsInput): Promise<IProfileData[]> =>
		new Promise((resolve, reject) =>
			getters.findFriendsSuggestions(context, { maxResults }, resolveCallback(resolve, reject)),
		),
});
