import * as yup from 'yup';

const usernameOrPasswordType = yup
	.string()
	.trim()
	.min(6)
	.max(32)
	.required();

const questionType = yup
	.string()
	.trim()
	.required();

const recoverType = yup
	.object()
	.shape({
		encryptedReminder: yup.string().trim(),
		question1: questionType,
		question2: questionType,
		reminder: questionType,
	})
	.required();

export const createAccountInput = yup
	.object()
	.shape({
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
		fullName: yup
			.string()
			.trim()
			.min(4)
			.max(128)
			.required(),
		aboutMeText: yup
			.string()
			.trim()
			.min(0)
			.max(180),
		miningEnabled: yup
			.bool()
			.default(false)
			.required(),
		password: usernameOrPasswordType,
		recover: recoverType,
		username: usernameOrPasswordType,
	})
	.required();

export const credentials = yup
	.object()
	.shape({
		password: usernameOrPasswordType,
		username: usernameOrPasswordType,
	})
	.required();

export const changePassword = yup
	.object()
	.shape({
		newPassword: usernameOrPasswordType,
		oldPassword: usernameOrPasswordType,
	})
	.required();

export const recoverAccountInput = yup
	.object()
	.shape({
		question1: questionType,
		question2: questionType,
		username: usernameOrPasswordType,
	})
	.required();

export default {
	changePassword,
	createAccountInput,
	credentials,
	recoverAccountInput,
};
