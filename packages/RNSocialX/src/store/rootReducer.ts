import { combineReducers } from 'redux';

import { IState as IAuth, reducer as auth } from './app/auth';
import { IState as IConfig, reducer as config } from './app/config';
import { IState as II18n, reducer as i18n } from './app/i18n';
import {
	IState as INavigationParams,
	reducer as navigationParams,
} from './app/navigationParams';

import { IState as IAccounts, reducer as accounts } from './data/accounts';
import {
	IState as INotifications,
	reducer as notifications,
} from './data/notifications';
import { IState as IPosts, reducer as posts } from './data/posts';
import { IState as IProfiles, reducer as profiles } from './data/profiles';

import { IState as IFiles, reducer as files } from './storage/files';

import { IState as IActivities, reducer as activities } from './ui/activities';
import { IState as IGlobals, reducer as globals } from './ui/globals';
import { IState as IOverlays, reducer as overlays } from './ui/overlays';

export interface IApplicationState {
	data: {
		accounts: IAccounts;
		notifications: INotifications;
		posts: IPosts;
		profiles: IProfiles;
	};
	app: {
		auth: IAuth;
		config: IConfig;
		i18n: II18n;
		navigationParams: INavigationParams;
	};
	ui: {
		activities: IActivities;
		globals: IGlobals;
		overlays: IOverlays;
	};
	storage: {
		files: IFiles;
	};
}

export default combineReducers<IApplicationState>({
	data: combineReducers({
		accounts,
		notifications,
		posts,
		profiles,
	}),
	app: combineReducers({
		auth,
		config,
		i18n,
		navigationParams,
	}),
	ui: combineReducers({
		activities,
		globals,
		overlays,
	}),
	storage: combineReducers({
		files,
	}),
});
