import { IContext } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';

import {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IFriendsCallbackData,
	IGetPublicKeyInput,
	IProfileCallbackData,
	IProfileData,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from './types';

import { resolveCallback } from '../../utils/helpers';

export default (context: IContext) => ({
	createProfile: async (
		createProfileInput: ICreateProfileInput,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.createProfileInput.validate(
				createProfileInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
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
	getProfileByUsername: async ({
		username,
	}: {
		username: string;
	}): Promise<IProfileData> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.getProfileByUsername.validate(
				{ username },
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<IProfileData>((resolve, reject) => {
			getters.getProfileByUsername(
				context,
				validatedInput as { username: string },
				resolveCallback(resolve, reject),
			);
		});
	},
	getPublicKeyByUsername: async ({
		username,
	}: IGetPublicKeyInput): Promise<string> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.getProfileByUsername.validate(
				{ username },
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<string>((resolve, reject) => {
			getters.getPublicKeyByUsername(
				context,
				validatedInput as IGetPublicKeyInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	updateProfile: async (
		updateProfileInput: IUpdateProfileInput,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.updateProfile.validate(
				updateProfileInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
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
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<null>((resolve, reject) => {
			setters.addFriend(
				context,
				validatedInput as IAddFriendInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	removeFriend: async (
		removeFriendInput: IRemoveFriendInput,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.removeFriend.validate(removeFriendInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<null>((resolve, reject) => {
			setters.removeFriend(
				context,
				validatedInput as IRemoveFriendInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	acceptFriend: async (
		acceptFriendInput: IAcceptFriendInput,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.acceptFriend.validate(acceptFriendInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
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
			getters.getCurrentProfileFriends(
				context,
				resolveCallback(resolve, reject),
			);
		}),
	getAllProfiles: (): Promise<any> =>
		new Promise((r, j) => {
			context.gun.get('profiles').docLoad((data) => r(data));
		}),
});
