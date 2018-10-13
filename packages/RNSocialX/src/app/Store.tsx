import * as React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
// tslint:disable-next-line:no-submodule-imports
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '../store';

import appConfig from './app.config.json';

const store = configureStore(
	{
		dataApi: {
			peers: appConfig.gun.superPeers,
			rootdb: appConfig.gun.rootdb,
		},
	},
	appConfig,
);

const persistor = persistStore(store);

export default class Store extends React.Component<{}, {}> {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{this.props.children}
				</PersistGate>
			</Provider>
		);
	}
}
