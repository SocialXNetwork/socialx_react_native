import React from 'react';
import { ConnectionInfo, ConnectionType, NetInfo } from 'react-native';
import { WithGlobals } from '../enhancers/connectors/ui/WithGlobals';

const CONNECTION_EVENT_NAME = 'connectionChange';

interface IOfflineHandlers {
	connectionStatusUpdated: (offline: boolean) => void;
}

class OfflineHandlers extends React.Component<IOfflineHandlers> {
	public componentDidMount() {
		NetInfo.getConnectionInfo().then(this.connectionStatusUpdated);
		NetInfo.addEventListener(
			CONNECTION_EVENT_NAME,
			this.connectionStatusUpdated,
		);
	}

	public componentWillUnmount() {
		NetInfo.removeEventListener(
			CONNECTION_EVENT_NAME,
			this.connectionStatusUpdated,
		);
	}

	render() {
		return this.props.children;
	}

	private connectionStatusUpdated = (
		connectionInfo: ConnectionInfo | ConnectionType,
	) => {
		connectionInfo = connectionInfo as ConnectionInfo;
		const isOffline =
			connectionInfo.type === 'none' || connectionInfo.type === 'unknown';
		this.props.connectionStatusUpdated(isOffline);
	};
}

export default ({ children }: { children: JSX.Element | JSX.Element[] }) => (
	<WithGlobals>
		{(globalsProps) => (
			<OfflineHandlers
				connectionStatusUpdated={(offline) => {
					globalsProps.setGlobal({ offline });
				}}
			>
				{children}
			</OfflineHandlers>
		)}
	</WithGlobals>
);
