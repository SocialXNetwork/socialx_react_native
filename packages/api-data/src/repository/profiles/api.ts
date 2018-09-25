import {IContext} from '../../types';
import getters, {IGetPublicKeyInput, IProfile} from './getters';
import schemas from './schemas';
import setters, {ICreateProfileInput} from './setters';

export default (context: IContext) => ({
	getPublicKeyByUsername: ({username}: IGetPublicKeyInput): Promise<string> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = {username};
				getters.getPublicKeyByUsername(context, validatedArgs, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
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
	getProfileByUsername: ({username}: {username: string}): Promise<IProfile> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = {username};
				getters.getProfileByUsername(context, validatedArgs, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	createProfile: (createProfileInput: ICreateProfileInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = createProfileInput;
				setters.createProfile(context, validatedArgs, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
});
