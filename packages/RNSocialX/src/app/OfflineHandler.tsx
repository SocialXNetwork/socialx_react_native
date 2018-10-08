import * as React from 'react';
import {
	ConnectionInfo,
	ConnectionType,
	NetInfo,
	Platform,
} from 'react-native';
import { WithGlobals } from '../enhancers/connectors/ui/WithGlobals';
import { OS_TYPES } from '../environment/consts';

interface IOfflineHandlers {
	connectionStatusUpdated: (offline: boolean) => void;
}

class OfflineHandler extends React.Component<IOfflineHandlers> {
	CONNECTION_EVENT_NAME = 'connectionChange';

	async componentDidMount() {
		if (Platform.OS === OS_TYPES.Android) {
			const connectionInfo = await NetInfo.getConnectionInfo();
			this.connectionStatusUpdated(connectionInfo);
		}

		NetInfo.addEventListener(
			this.CONNECTION_EVENT_NAME,
			this.connectionStatusUpdated,
		);
	}

	componentWillUnmount() {
		NetInfo.removeEventListener(
			this.CONNECTION_EVENT_NAME,
			this.connectionStatusUpdated,
		);
	}

	connectionStatusUpdated = (
		connectionInfo: ConnectionInfo | ConnectionType,
	) => {
		const { type } = connectionInfo as ConnectionInfo;
		const isOffline = type === 'none' || type === 'unknown';
		this.props.connectionStatusUpdated(isOffline);
	};

	render() {
		return this.props.children;
	}
}

const EnhancedOfflineHandler: React.SFC<{}> = (props) => (
	<WithGlobals>
		{(globalsProps) => (
			<OfflineHandler
				connectionStatusUpdated={(offline) => {
					globalsProps.setGlobal({ offline });
				}}
			>
				{props.children}
			</OfflineHandler>
		)}
	</WithGlobals>
);

export default EnhancedOfflineHandler;
