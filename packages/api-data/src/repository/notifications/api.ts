import { IContext } from '../../types';
import { ICreateNotification, INotificationsReturnData, IRemoveNotificationInput } from './types';

import getters from './getters';
import schemas from './schemas';
import setters from './setters';

import { ApiError, ValidationError } from '../../utils/errors';
import { resolveCallback } from '../../utils/helpers';

export default (context: IContext) => ({
	// todo @jake I think we should separate the input type from the data type
	// because the data can always contain auto generated things that don't exist on the input itself
	createNotification: async (createNotificationInput: ICreateNotification): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.createNotification.validate(createNotificationInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
				validationInput: createNotificationInput,
			});
		}

		return new Promise<null>((resolve, reject) => {
			setters.createNotification(
				context,
				validatedInput as ICreateNotification,
				resolveCallback(resolve, reject),
			);
		});
	},
	addFriendRequestNotification: async (username: string) => {
		try {
			await setters.addFriendRequest(context, username);
			return null;
		} catch (e) {
			throw new ApiError(e);
		}
	},
	removeFriendRequestNotification: async (username: string) => {
		try {
			await setters.removeFriendRequest(context, username);
			return null;
		} catch (e) {
			throw new ApiError(e);
		}
	},
	addFriendRequestResponseNotification: async (username: string) => {
		try {
			await setters.saveFriendRequestResponse(context, username, true);
			return null;
		} catch (e) {
			throw new ApiError(e);
		}
	},
	getNotifications: (): Promise<INotificationsReturnData[]> =>
		new Promise((resolve, reject) => {
			getters.getNotifications(context, resolveCallback(resolve, reject));
		}),
});
