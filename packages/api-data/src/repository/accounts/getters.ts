import {IContext, IGunCallback} from '../../types';

export const isAccountLoggedIn = (context: IContext, callback: IGunCallback<{loggedIn: boolean}>) => {
	const {account} = context;
	return callback(null, {loggedIn: !!account.is});
};
