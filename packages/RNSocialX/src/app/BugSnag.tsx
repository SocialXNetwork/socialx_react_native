import { Client, Configuration } from 'bugsnag-react-native';
import * as React from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { OS_TYPES } from '../environment/consts';

const BUGSNAG_API_KEY = '73245fce110f157e3c5ba0c2ac7154ae';

interface IBugSnagProps {
	children: (bugSnag: Client | null) => JSX.Element;
}

export default class BugSnag extends React.Component<IBugSnagProps> {
	private client: Client | null;

	constructor(props: IBugSnagProps) {
		super(props);
		const packageVersion = DeviceInfo.getVersion();
		const computedVersion = parseInt(packageVersion.replace(/\D/g, ''), 10);
		const computedAppVersion =
			Platform.OS === OS_TYPES.Android ? computedVersion * 10 + 2 : computedVersion * 10 + 1;

		if (!__DEV__) {
			const config = new Configuration(BUGSNAG_API_KEY);
			config.appVersion = computedAppVersion.toString();
			config.autoCaptureSessions = false;

			const client = new Client(config);
			client.startSession();
			this.client = client;
		} else {
			this.client = null;
		}
	}

	render() {
		return this.props.children(this.client);
	}
}
