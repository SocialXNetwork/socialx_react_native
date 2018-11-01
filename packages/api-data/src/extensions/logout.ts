import * as Gun from 'gun/gun';
import { IContext } from '../types';

// tslint:disable
Gun.chain.logout = function(context: IContext) {
    const {account, gun} = context;
    if (!account.is) {
        return;
    }

    const rootUser = this.back(-1)._.user;
    if (rootUser) {
        delete rootUser.is;
        delete rootUser._.is;
        delete rootUser._.sea;
    };
    // @ts-ignore
    account = new Gun({peers: context.config.peers}).user();
};
