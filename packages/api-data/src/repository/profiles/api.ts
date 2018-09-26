import { IContext } from '../../types';
import getters, { IGetPublicKeyInput, IProfile } from './getters';
import schemas from './schemas';
import setters, { ICreateProfileInput } from './setters';

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
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getCurrentProfile: (): Promise<IProfile> =>
		new Promise(async (resolve, reject) => {
			getters.getCurrentProfile(context, (e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
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
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
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
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
});
