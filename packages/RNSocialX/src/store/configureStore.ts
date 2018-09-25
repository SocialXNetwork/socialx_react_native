import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {dataApiFactory} from '@socialx/api-data';

import rootReducer, {IApplicationState} from './rootReducer';
import {IContextConfig} from './types';

export const configureStore = (initialState: IApplicationState, depsConfig: IContextConfig) => {
	// TODO: app should show a ui to allow user to search/add/edit peers
	const dataApi = dataApiFactory({
		peers: depsConfig.dataApi.peers,
	});

	const store = createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk.withExtraArgument({dataApi}))),
	);

	if (module.hot) {
		module.hot.accept(() => {
			// eslint-disable-next-line global-require
			const nextRootReducer = require('./rootReducer');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};
