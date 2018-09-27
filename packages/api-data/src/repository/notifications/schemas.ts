import yup from 'yup';

const types = [
	'RECENT_COMMENT',
	'FRIEND_REQUEST',
	'FRIEND_REQUEST_RESPONSE',
	'GROUP_REQUEST',
	'SUPER_LIKED',
];
const stringType = yup
	.string()
	.trim()
	.min(1)
	.max(50);

const notificationType = yup.string().oneOf(types);
const accountType = yup.object().shape({
	alias: stringType.required(),
	pub: stringType.required(),
});

export const addNotifications = yup
	.object()
	.shape({
		type: notificationType.required(),
		from: accountType.required(),
		to: accountType.required(),
		timestamp: yup.number().required(),
	})
	.required();

export const discardNotification = yup
	.object()
	.shape({
		notificationId: stringType.required(),
	})
	.required();

export const notificationById = yup
	.object()
	.shape({
		notificationId: stringType.required(),
	})
	.required();

export default { addNotifications, discardNotification, notificationById };
