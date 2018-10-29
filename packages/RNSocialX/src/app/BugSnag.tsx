import { Client, Configuration } from 'bugsnag-react-native';
import * as React from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { OS_TYPES } from '../environment/consts';

const BUGSNAG_API_KEY = '73245fce110f157e3c5ba0c2ac7154ae';

export default class BugSnap extends React.Component<{}> {
	componentDidMount() {
		const packageVersion = DeviceInfo.getVersion();
		const computedVersion = parseInt(packageVersion.replace(/\D/g, ''), 10);
		const computedAppVersion =
			Platform.OS === OS_TYPES.Android ? computedVersion * 10 + 2 : computedVersion * 10 + 1;

		if (!__DEV__) {
			const bugSnagConf = new Configuration(BUGSNAG_API_KEY);
			bugSnagConf.appVersion = computedAppVersion.toString();
			bugSnagConf.autoCaptureSessions = false;
			const BugSnag = new Client(bugSnagConf);
			BugSnag.startSession();
		}
	}

	render() {
		return this.props.children;
	}
}
