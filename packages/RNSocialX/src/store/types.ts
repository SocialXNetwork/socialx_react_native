import {IApiOptions, IDataApiFactory} from '@socialx/api-data';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {IAction as IAuthAction} from './app/auth/Types';
import {IApplicationState} from './rootReducer';

type IApplicationAction = IAuthAction;

export type IThunk = ThunkAction<void, IApplicationState, IContext, IApplicationAction>;

export interface IContextConfig {
	dataApi: IApiOptions;
}

export interface IContext {
	dataApi: IDataApiFactory;
}
