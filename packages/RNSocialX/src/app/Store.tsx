import * as React from 'react';
import { Provider } from 'react-redux';
import { Persistor, persistStore } from 'redux-persist';
// tslint:disable-next-line:no-submodule-imports
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '../store';

import appConfig from './app.config.json';

export default class Store extends React.Component<
	{
		// bugsnag: Client | null;
		bugsnag: any;
	},
	{}
> {
	private store: any;
	private persistor: Persistor;

	constructor(props: any) {
		super(props);
		const { bugsnag } = props;
		this.store = configureStore(
			{
				dataApi: {
					peers: appConfig.gun.superPeers,
					rootdb: appConfig.gun.rootdb,
				},
			},
			appConfig,
			bugsnag,
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
