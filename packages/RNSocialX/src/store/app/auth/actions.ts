import {ICreateAccountInput} from '@socialx/api-data';
import {ThunkAction} from 'redux-thunk';
import {IApplicationState} from '../../rootReducer';
import {IContext} from '../../types';
import {ActionTypes, IAction} from './Types';

type IThunk<R> = ThunkAction<R, IApplicationState, IContext, IAction>;

export const createAccount = (createAccountInput: ICreateAccountInput): IThunk<void> => async (
	dispatch,
	getState,
	context,
) => {
	try {
		// @ts-ignore
		await context.dataApi.accounts.createAccount();
	} catch (e) {
		/**/
	}
};
