import * as profileHandles from './handles';

interface ICreateProfileInput {
	username: string;
	email: string;
	avatar: string;
	pub: string;
}

export const createProfile = (
	context: IContext,
	createProfileInput: ICreateProfileInput,
	callback: IGunCallback<null>,
) => {
	const {username, ...rest} = createProfileInput;
	profileHandles.profileByUsername(context, username).put({...rest}, (flags) => {
		if (flags.err) {
			return callback('failed, error => ' + flags.err);
		}

		callback(null);
	});
};
