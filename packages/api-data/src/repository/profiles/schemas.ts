import * as yup from 'yup';

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
			.default(''),
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
		fullName: yup
			.string()
			.trim()
			.min(4)
			.max(128)
			.required(),
		pub: longTextType.required(),
		username: usernameOrPasswordType,
	})
	.required();

export const updateProfile = yup
	.object()
	.shape({
		aboutMeText: yup
			.string()
			.trim()
			.min(10)
			.max(200),
		avatar: yup.string().trim(),
		email: yup
			.string()
			.trim()
			.lowercase()
			.email(),
		fullName: yup
			.string()
			.trim()
			.min(4)
			.max(128),
	})
	.required();

export const getProfilesByUsernames = yup.object().shape({
	usernames: yup.array().of(yup.string()),
});

export const addFriend = yup
	.object()
	.shape({
		username: usernameOrPasswordType,
	})
	.required();

export const removeFriend = yup
	.object()
	.shape({
		friendshipId: longTextType.required(),
		username: usernameOrPasswordType,
	})
	.required();

export const acceptFriend = yup
	.object()
	.shape({
		friendshipId: longTextType.required(),
		username: usernameOrPasswordType,
	})
	.required();

export default {
	createProfileInput,
	getProfileByUsername,
	publicKeyInput,
	updateProfile,
	addFriend,
	removeFriend,
	acceptFriend,
	getProfilesByUsernames,
};
