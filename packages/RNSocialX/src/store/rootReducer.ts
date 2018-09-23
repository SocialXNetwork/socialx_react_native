import {combineReducers} from 'redux';
import {IState as IAuth, reducer as auth} from './app/auth';
import {IState as IConfig, reducer as config} from './app/config';
import {IState as II18n, reducer as i18n} from './app/i18n';
import {IState as INavigation, reducer as navigation} from './app/navigation';
import {IState as IAggregates, reducer as aggregates} from './data/aggregates';
import {IState as IComments, reducer as comments} from './data/comments';
import {IState as IPosts, reducer as posts} from './data/posts';
import {IState as IUsers, reducer as users} from './data/users';
import {IState as IFiles, reducer as files} from './storage/files';
import {IState as IOverlays, reducer as overlays} from './ui/overlays';

export interface IApplicationState {
	app: {
		config: IConfig;
		i18n: II18n;
		auth: IAuth;
		navigation: INavigation;
	};
	data: {
		users: IUsers;
		posts: IPosts;
		comments: IComments;
		aggregates: IAggregates;
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
		auth,
		navigation,
	}),
	data: combineReducers({
		users,
		posts,
		comments,
		aggregates,
	}),
	ui: combineReducers({
		overlays,
	}),
	storage: combineReducers({
		files,
	}),
});
