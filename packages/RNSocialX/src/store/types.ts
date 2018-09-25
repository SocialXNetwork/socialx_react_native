import {IApiOptions, IDataApiFactory} from '@socialx/api-data';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {IApplicationState} from './rootReducer';

export type IThunk<R, A extends Action> = ThunkAction<R, IApplicationState, IContext, A>;

export interface IContextConfig {
	dataApi: IApiOptions;
}

export interface IContext {
	dataApi: IDataApiFactory;
}
