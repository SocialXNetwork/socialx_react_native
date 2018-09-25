import {combineReducers} from 'redux';

import {IState as IAccounts, reducer as accounts} from './app/accounts';
import {IState as IConfig, reducer as config} from './app/config';
import {IState as II18n, reducer as i18n} from './app/i18n';
import {IState as INavigation, reducer as navigation} from './app/navigation';
import {IState as IComments, reducer as comments} from './data/comments';
import {IState as IPosts, reducer as posts} from './data/posts';
import {IState as IProfiles, reducer as profiles} from './data/profiles';
import {IState as IFiles, reducer as files} from './storage/files';
import {IState as IOverlays, reducer as overlays} from './ui/overlays';

export interface IApplicationState {
	app: {
		config: IConfig;
		i18n: II18n;
		accounts: IAccounts;
		navigation: INavigation;
	};
	data: {
		profiles: IProfiles;
		posts: IPosts;
		comments: IComments;
	};
	ui: {
		overlays: IOverlays;
	};
	storage: {
		files: IFiles;
	};
}

export default combineReducers<IApplicationState>({
	app: combineReducers({
		config,
		i18n,
		accounts,
		navigation,
	}),
	data: combineReducers({
		profiles,
		posts,
		comments,
	}),
	ui: combineReducers({
		overlays,
	}),
	storage: combineReducers({
		files,
	}),
});
