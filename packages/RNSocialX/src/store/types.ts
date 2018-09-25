import {IApiOptions, IDataApiFactory} from '@socialx/api-data';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IAction as IAuthAction} from './app/accounts/Types';
import {IApplicationState} from './rootReducer';

type IApplicationAction = IAuthAction;

export type IThunk = ThunkAction<Promise<void>, IApplicationState, IContext, IApplicationAction>;

export type IThunkDispatch = ThunkDispatch<IApplicationState, IContext, IApplicationAction>;

export interface IContextConfig {
	dataApi: IApiOptions;
}

export interface IContext {
	dataApi: IDataApiFactory;
}
