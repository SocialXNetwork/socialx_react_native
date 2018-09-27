import { IApiOptions, IDataApiFactory } from '@socialx/api-data';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IApplicationState } from './rootReducer';

// import { IAction as INotificationsActions } from './data/notifications/Types';
import { IAction as IAccountActions } from './data/accounts/Types';
import { IAction as ICommentsActions } from './data/comments/Types';
import { IAction as IPostsActions } from './data/posts/Types';
import { IAction as IProfilesActions } from './data/profiles/Types';

import { IAction as II18nActions } from './app/i18n/Types';

// todo enable notifications actions when implemented @jake
type IApplicationAction =
	// | INotificationsActions
	| IAccountActions
	| IProfilesActions
	| IPostsActions
	| ICommentsActions
	| II18nActions;

export type IThunk = ThunkAction<
	Promise<void>,
	IApplicationState,
	IContext,
	IApplicationAction
>;

export type IThunkDispatch = ThunkDispatch<
	IApplicationState,
	IContext,
	IApplicationAction
>;

export interface IContextConfig {
	dataApi: IApiOptions;
}

export interface IContext {
	dataApi: IDataApiFactory;
}
