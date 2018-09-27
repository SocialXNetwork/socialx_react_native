import { IContext } from '../../types';
import {
	IDiscardNotificationInput,
	INotificationByIdInput,
	INotificationData,
	INotificationsReturnData,
} from './types';

import getters from './getters';
import schemas from './schemas';
import setters, { discardNotification } from './setters';

export default (context: IContext) => ({
	addNotifcation: (addNotificationInput: INotificationData): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.addNotifications.validate(
					addNotificationInput,
					{ stripUnknown: true },
				);
				setters.addNotification(
					context,
					validatedInput as INotificationData,
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(e);
			}
		}),
	discardNotifcation: (
		discardNotifcationInput: IDiscardNotificationInput,
	): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.discardNotification.validate(
					discardNotification,
					{ stripUnknown: true },
				);
				setters.discardNotification(
					context,
					validatedInput as IDiscardNotificationInput,
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(e);
			}
		}),
	currentNotifications: (): Promise<INotificationsReturnData> =>
		new Promise((resolve, reject) => {
			getters.currentNotifications(context, (e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
		}),
	notificationById: (
		notificationByIdInput: INotificationByIdInput,
	): Promise<INotificationData> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.notificationById.validate(
					notificationByIdInput,
					{ stripUnknown: true },
				);
				getters.notificationById(
					context,
					validatedInput as INotificationByIdInput,
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(e);
			}
		}),
});
