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
	createNotification: async (
		createNotificationInput: ICreateNotification,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.createNotification.validate(
				createNotificationInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<null>((resolve, reject) => {
			setters.createNotification(
				context,
				validatedInput as ICreateNotification,
				resolveCallback(resolve, reject),
			);
		});
	},
	removeNotification: async (
		removeNotifcationInput: IRemoveNotificationInput,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.removeNotification.validate(
				removeNotifcationInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<null>((resolve, reject) => {
			setters.removeNotification(
				context,
				validatedInput as IRemoveNotificationInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	getNotifications: (): Promise<INotificationsReturnData[]> =>
		new Promise((resolve, reject) => {
			getters.getNotifications(context, resolveCallback(resolve, reject));
		}),
});
