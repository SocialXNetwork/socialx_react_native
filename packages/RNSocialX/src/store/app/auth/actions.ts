import {ICreateAccountInput} from '@socialx/api-data';
import {IThunk} from '../../types';
import {ActionTypes} from './Types';

export const createAccount = (createAccountInput: ICreateAccountInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		await context.dataApi.accounts.createAccount(createAccountInput);
		const currentUserProfile = await context.dataApi.profiles.getCurrentProfile();
		// TODO: dispatch payload needs to be of type IProfile as on the line above, action types needs reviewing
		dispatch({
			type: ActionTypes.CREATE_ACCOUNT,
			payload: createAccountInput,
		});
	} catch (e) {
		/**/
	}
};
