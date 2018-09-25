import yup, {Schema} from 'yup';
import {ICreateAccountInput} from './setters';

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
		question1: questionType,
		question2: questionType,
		reminder: questionType,
		encryptedReminder: yup.string().trim(),
	})
	.required();

export const createAccountInput = yup.object().shape({
	username: usernameOrPasswordType,
	password: usernameOrPasswordType,
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
	recover: recoverType,
});

export const credentials = yup.object().shape({
	username: usernameOrPasswordType,
	password: usernameOrPasswordType,
});

export const changePassword = yup.object().shape({
	oldPassword: usernameOrPasswordType,
	newPassword: usernameOrPasswordType,
});

export const recoverAccountInput = yup.object().shape({
	username: usernameOrPasswordType,
	question1: questionType,
	question2: questionType,
});

export default {
	createAccountInput,
	credentials,
	changePassword,
	recoverAccountInput,
};
