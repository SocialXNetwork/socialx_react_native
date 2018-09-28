import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { dataApiFactory } from '@socialx/api-data';

import rootReducer from './rootReducer';
import { IContextConfig } from './types';

import { IApplicationConfig, setAppConfig } from './app/config';

export const configureStore = (
	depsConfig: IContextConfig,
	appConfig: IApplicationConfig,
) => {
	const dataApi = dataApiFactory({
		peers: depsConfig.dataApi.peers,
	});

	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ dataApi }))),
	);

	if (module.hot) {
		module.hot.accept(() => {
			// eslint-disable-next-line global-require
			const nextRootReducer = require('./rootReducer');
			store.replaceReducer(nextRootReducer);
		});
	}

	store.dispatch(setAppConfig({ appConfig }));

	return store;
};
