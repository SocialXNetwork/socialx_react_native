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
		username: usernameOrPasswordType,
		name: yup
			.string()
			.trim()
			.min(4)
			.max(128)
			.required(),
		email: yup
			.string()
			.trim()
			.lowercase()
			.email()
			.required(),
		avatar: yup
			.string()
			.trim()
			.required(),
		pub: longTextType.required(),
	})
	.required();

export default {
	publicKeyInput,
	getProfileByUsername,
	createProfileInput,
};
