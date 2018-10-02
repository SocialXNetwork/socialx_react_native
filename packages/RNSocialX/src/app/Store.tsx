import * as React from 'react';
import { Provider } from 'react-redux';
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

export default class Store extends React.Component<{}, {}> {
	render() {
		return <Provider store={store}>{this.props.children}</Provider>;
	}
}
