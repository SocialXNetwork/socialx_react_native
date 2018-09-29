import { IContext } from '../../types';
import {
	ICreateNotification,
	INotificationsReturnData,
	IRemoveNotificationInput,
} from './types';

import getters from './getters';
import schemas from './schemas';
import setters, { removeNotification } from './setters';

import { resolveCallback } from '../../utils/helpers';

export default (context: IContext) => ({
	// todo @jake I think we should separate the input type from the data type
	// because the data can always contain auto generated things that don't exist on the input itself
	createNotification: (
		createNotificationInput: ICreateNotification,
	): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.createNotification.validate(
					createNotificationInput,
					{ stripUnknown: true },
				);
				setters.createNotification(
					context,
					validatedInput as ICreateNotification,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	removeNotification: (
		removeNotifcationInput: IRemoveNotificationInput,
	): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.removeNotification.validate(
					removeNotification,
					{ stripUnknown: true },
				);
				setters.removeNotification(
					context,
					validatedInput as IRemoveNotificationInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	getNotifications: (): Promise<INotificationsReturnData[]> =>
		new Promise((resolve, reject) => {
			getters.getNotifications(context, resolveCallback(resolve, reject));
		}),
});
