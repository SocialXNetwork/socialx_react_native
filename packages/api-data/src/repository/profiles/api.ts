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

import { resolveCallback } from '../../utils/helpers';

export default (context: IContext) => ({
	createProfile: (createProfileInput: ICreateProfileInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.createProfileInput.validate(
					createProfileInput,
					{
						stripUnknown: true,
					},
				);
				setters.createProfile(
					context,
					validatedInput as ICreateProfileInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getCurrentProfile: (): Promise<IProfile> =>
		new Promise(async (resolve, reject) => {
			getters.getCurrentProfile(context, resolveCallback(resolve, reject));
		}),
	getProfileByUsername: ({
		username,
	}: {
		username: string;
	}): Promise<IProfile> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.getProfileByUsername.validate(
					{ username },
					{
						stripUnknown: true,
					},
				);
				getters.getProfileByUsername(
					context,
					validatedInput as { username: string },
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getPublicKeyByUsername: ({ username }: IGetPublicKeyInput): Promise<string> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.publicKeyInput.validate(
					{ username },
					{
						stripUnknown: true,
					},
				);
				getters.getPublicKeyByUsername(
					context,
					validatedInput as IGetPublicKeyInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	updateProfile: (updateProfileInput: IUpdateProfileInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.updateProfile.validate(
					updateProfileInput,
					{ stripUnknown: true },
				);
				setters.updateProfile(
					context,
					validatedInput as IUpdateProfileInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	addFriend: (addFriendInput: IAddFriendInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.addFriend.validate(
					addFriendInput,
					{
						stripUnknown: true,
					},
				);
				setters.addFriend(
					context,
					validatedInput as IAddFriendInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	removeFriend: (removeFriendInput: IRemoveFriendInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.removeFriend.validate(
					removeFriendInput,
					{ stripUnknown: true },
				);
				setters.removeFriend(
					context,
					validatedInput as IRemoveFriendInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	acceptFriend: (acceptFriendInput: IAcceptFriendInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.acceptFriend.validate(
					acceptFriendInput,
					{ stripUnknown: true },
				);
				setters.acceptFriend(
					context,
					validatedInput as IAcceptFriendInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	getCurrentProfileFriends: (): Promise<IFriendsReturnData> =>
		new Promise((resolve, reject) => {
			getters.getCurrentProfileFriends(
				context,
				resolveCallback(resolve, reject),
			);
		}),
});
