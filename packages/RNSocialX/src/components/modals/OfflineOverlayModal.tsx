import React from 'react';
import {ActivityIndicator, ConnectionInfo, ConnectionType, NetInfo, SafeAreaView, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {WithManagedTransitions} from '..';
import {ITranslatedProps} from '../../types';
import styles, {defaultColor} from './OfflineOverlayModal.style';

const CONNECTION_EVENT_NAME = 'connectionChange';

interface IOfflineOverlayModalProps extends ITranslatedProps {
	visible: boolean;
}

interface IOfflineOverlayModalState {
	offline: boolean;
}

export class OfflineOverlayModal extends React.Component<IOfflineOverlayModalProps, IOfflineOverlayModalState> {
	public state = {
		offline: false,
	};

	public componentDidMount() {
		NetInfo.getConnectionInfo().then(this.connectionStatusUpdated);
		NetInfo.addEventListener(CONNECTION_EVENT_NAME, this.connectionStatusUpdated);
	}

	public componentWillUnmount() {
		NetInfo.removeEventListener(CONNECTION_EVENT_NAME, this.connectionStatusUpdated);
	}

	public render() {
		const visible = this.state.offline || this.props.visible;

		return (
			<WithManagedTransitions modalVisible={visible}>
				{({onDismiss, onModalHide}) => (
					<Modal
						// @ts-ignore
						onDismiss={onDismiss}
						onModalHide={onModalHide}
						isVisible={visible}
						backdropOpacity={0.2}
						animationIn={'slideInDown'}
						animationOut={'slideOutUp'}
						style={styles.container}
					>
						<SafeAreaView>
							<View style={styles.boxContainer}>
								<ActivityIndicator size={'small'} color={defaultColor} />
								<Text style={styles.message}>{this.props.getText('offline.overlay.message')}</Text>
							</View>
						</SafeAreaView>
					</Modal>
				)}
			</WithManagedTransitions>
		);
	}

	private connectionStatusUpdated = (connectionInfo: ConnectionInfo | ConnectionType) => {
		connectionInfo = connectionInfo as ConnectionInfo;
		const isOffline = connectionInfo.type === 'none' || connectionInfo.type === 'unknown';
		this.setState({
			offline: isOffline,
		});
	};
}
