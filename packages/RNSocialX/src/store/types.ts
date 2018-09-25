import {IApiOptions, IDataApiFactory} from '@socialx/api-data';

export interface IContextConfig {
	dataApi: IApiOptions;
}

export interface IContext {
	dataApi: IDataApiFactory;
}
