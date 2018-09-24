import {IContext, TABLE_ENUMS} from '../../types';

export const currentAccountRecover = (context: IContext) => {
	const {account} = context;
	return account.get(TABLE_ENUMS.RECOVER);
};

export const accountByPub = (context: IContext, pub: string) => {
	const {gun} = context;
	return gun.user(pub);
};
