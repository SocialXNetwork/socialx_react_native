import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
// tslint:disable-next-line
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

import { dataApiFactory } from '@socialx/api-data';
import { storageApiFactory } from '@socialx/api-storage';

import { Client } from 'bugsnag-react-native';
import { Platform } from 'react-native';
import { IApplicationConfig, setAppConfig } from './app/config';
import rootReducer from './rootReducer';
import { IContextConfig } from './types';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
};

export const configureStore = (
	depsConfig: IContextConfig,
	appConfig: IApplicationConfig,
	bugsnag: Client,
) => {
	const persistedReducer = persistReducer(persistConfig, rootReducer);
	const dataApi = dataApiFactory({
		peers: depsConfig.dataApi.peers.map((peer: string) => `http://${peer}:8765/gun`),
		rootdb: depsConfig.dataApi.rootdb,
	});

	const storageApi = storageApiFactory(
		{
			host: appConfig.ipfsConfig.ipfs_server,
			port: appConfig.ipfsConfig.ipfs_port,
			protocol: appConfig.ipfsConfig.opts.protocol,
			root: appConfig.ipfsConfig.opts.root,
		},
		Platform.OS,
	);

	const store = createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ dataApi, storageApi, bugsnag }))),
	);

	if (module.hot) {
		module.hot.accept(() => {
			// eslint-disable-next-line global-require
			const nextRootReducer = require('./rootReducer');
			store.replaceReducer(nextRootReducer);
		});
	}

	// Check the type of appConfig
	store.dispatch(setAppConfig({ appConfig }) as any);

	// subscribe to all events on gun
	// setTimeout(() => { dispatch(subscribeToAll) }, 2500);

	return store;
};
