import { Client } from 'bugsnag-react-native';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Persistor, persistStore } from 'redux-persist';

// tslint:disable-next-line:no-submodule-imports
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '../store';

import appConfig from './app.config.json';

interface IStoreProps {
	bugSnag: Client | null;
}

export default class Store extends React.Component<IStoreProps> {
	private store: any;
	private persistor: Persistor;

	constructor(props: IStoreProps) {
		super(props);
		const { bugSnag } = props;

		this.store = configureStore(
			{
				dataApi: {
					peers: appConfig.gun.superPeers,
					rootdb: appConfig.gun.rootdb,
				},
			},
			appConfig,
			bugSnag!,
		);

		this.persistor = persistStore(this.store);
	}

	render() {
		return (
			<Provider store={this.store}>
				<PersistGate loading={null} persistor={this.persistor}>
					{this.props.children}
				</PersistGate>
			</Provider>
		);
	}
}
