import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { dataApiFactory } from '@socialx/api-data';
import { storageApiFactory } from '@socialx/api-storage';

import rootReducer from './rootReducer';
import { IContextConfig } from './types';

import { IApplicationConfig, setAppConfig } from './app/config';

import Uploader from 'react-native-background-upload';

import { AsyncStorage } from 'react-native'; // defaults to localStorage for web and AsyncStorage for react-native
import { persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	// NOTE: takes an array of strings
	blacklist: ['ui'],
	// whitelist: [],
};

export const configureStore = (
	depsConfig: IContextConfig,
	appConfig: IApplicationConfig,
) => {
	const persistedReducer = persistReducer(persistConfig, rootReducer);
	const dataApi = dataApiFactory({
		peers: depsConfig.dataApi.peers,
		rootdb: depsConfig.dataApi.rootdb,
	});

	const storageApi = storageApiFactory(
		{
			host: appConfig.ipfsConfig.ipfs_server,
			port: appConfig.ipfsConfig.ipfs_port,
			protocol: appConfig.ipfsConfig.opts.protocol,
			root: appConfig.ipfsConfig.opts.root,
		},
		Uploader,
	);

	const store = createStore(
		persistedReducer,
		composeWithDevTools(
			applyMiddleware(thunk.withExtraArgument({ dataApi, storageApi })),
		),
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
