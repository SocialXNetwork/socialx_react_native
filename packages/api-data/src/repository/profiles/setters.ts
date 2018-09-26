import { IContext, IGunCallback } from '../../types';
import * as profileHandles from './handles';

export interface ICreateProfileInput {
	username: string;
	aboutMeText: string;
	miningEnabled: boolean;
	name: string;
	email: string;
	avatar: string;
	pub: string;
}

export const createProfile = (
	context: IContext,
	createProfileInput: ICreateProfileInput,
	callback: IGunCallback<null>,
) => {
	const { username, ...rest } = createProfileInput;
	profileHandles
		.profileByUsername(context, username)
		.put({ ...rest }, (flags) => {
			if (flags.err) {
				return callback('failed, error => ' + flags.err);
			}

			callback(null);
		});
};

export default {
	createProfile,
};
