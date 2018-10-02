import { IApiOptions, IDataApiFactory } from '@socialx/api-data';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IApplicationState } from './rootReducer';

import { IAction as IAccountActions } from './data/accounts/Types';
import { IAction as INotificationsActions } from './data/notifications/Types';
import { IAction as IPostsActions } from './data/posts/Types';
import { IAction as IProfilesActions } from './data/profiles/Types';

import { IAction as IAuthActions } from './app/auth/Types';
import { IAction as IConfigActions } from './app/config/Types';
import { IAction as II18nActions } from './app/i18n/Types';
import { IAction as INavigationParamsActions } from './app/navigationParams/Types';

import { IAction as IFilesActions } from './storage/files/Types';

import { IAction as IActivitiesActions } from './ui/activities/Types';
import { IAction as IGlobalsActions } from './ui/globals/Types';
import { IAction as IOverlaysActions } from './ui/overlays/Types';

type IApplicationAction =
	| IAccountActions
	| IProfilesActions
	| IPostsActions
	| INotificationsActions
	| IAuthActions
	| IConfigActions
	| II18nActions
	| INavigationParamsActions
	| IFilesActions
	| IActivitiesActions
	| IGlobalsActions
	| IOverlaysActions;

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
