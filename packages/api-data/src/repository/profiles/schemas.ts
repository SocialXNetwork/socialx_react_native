import yup from 'yup';

const usernameOrPasswordType = yup
	.string()
	.trim()
	.min(6)
	.max(32)
	.required();

const longTextType = yup
	.string()
	.trim()
	.min(1)
	.max(4096);

export const publicKeyInput = yup
	.object()
	.shape({
		username: usernameOrPasswordType,
	})
	.required();

export const getProfileByUsername = yup
	.object()
	.shape({
		username: usernameOrPasswordType,
	})
	.required();

export const createProfileInput = yup
	.object()
	.shape({
		aboutMeText: yup
			.string()
			.trim()
			.min(10)
			.max(200),
		avatar: yup
			.string()
			.trim()
			.required(),
		email: yup
			.string()
			.trim()
			.lowercase()
			.email()
			.required(),
		miningEnabled: yup
			.bool()
			.default(false)
			.required(),
		name: yup
			.string()
			.trim()
			.min(4)
			.max(128)
			.required(),
		pub: longTextType.required(),
		username: usernameOrPasswordType,
	})
	.required();

export default {
	createProfileInput,
	getProfileByUsername,
	publicKeyInput,
};
