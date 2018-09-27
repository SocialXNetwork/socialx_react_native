import { IContext } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';

import {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IFriendsReturnData,
	IGetPublicKeyInput,
	IProfile,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from './types';

import { apiResolveExt } from '../../utils/helpers';

export default (context: IContext) => ({
	createProfile: (createProfileInput: ICreateProfileInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.createProfileInput.validate(
					createProfileInput,
					{
						stripUnknown: true,
					},
				);
				setters.createProfile(
					context,
					validatedArgs as ICreateProfileInput,
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getCurrentProfile: (): Promise<IProfile> =>
		new Promise(async (resolve, reject) => {
			getters.getCurrentProfile(context, apiResolveExt(resolve, reject));
		}),
	getProfileByUsername: ({
		username,
	}: {
		username: string;
	}): Promise<IProfile> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.getProfileByUsername.validate(
					{ username },
					{
						stripUnknown: true,
					},
				);
				getters.getProfileByUsername(
					context,
					validatedArgs as { username: string },
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getPublicKeyByUsername: ({ username }: IGetPublicKeyInput): Promise<string> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.publicKeyInput.validate(
					{ username },
					{
						stripUnknown: true,
					},
				);
				getters.getPublicKeyByUsername(
					context,
					validatedArgs as IGetPublicKeyInput,
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	updateProfile: (updateProfileInput: IUpdateProfileInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.updateProfile.validate(
					updateProfileInput,
					{ stripUnknown: true },
				);
				setters.updateProfile(
					context,
					validatedArgs as IUpdateProfileInput,
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	addFriend: (addFriendInput: IAddFriendInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.addFriend.validate(addFriendInput, {
					stripUnknown: true,
				});
				setters.addFriend(
					context,
					validatedArgs as IAddFriendInput,
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	removeFriend: (removeFriendInput: IRemoveFriendInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.removeFriend.validate(
					removeFriendInput,
					{ stripUnknown: true },
				);
				setters.removeFriend(
					context,
					validatedArgs as IRemoveFriendInput,
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	acceptFriend: (acceptFriendInput: IAcceptFriendInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.acceptFriend.validate(
					acceptFriendInput,
					{ stripUnknown: true },
				);
				setters.acceptFriend(
					context,
					validatedArgs as IAcceptFriendInput,
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	currentProfileFriends: (): Promise<IFriendsReturnData> =>
		new Promise((resolve, reject) => {
			getters.getCurrentFriends(context, apiResolveExt(resolve, reject));
		}),
});
