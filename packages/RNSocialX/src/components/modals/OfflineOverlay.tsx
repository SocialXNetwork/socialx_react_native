import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { WithManagedTransitions } from '..';
import { Colors } from '../../environment/theme';
import { IDictionary } from '../../types';

import styles from './OfflineOverlay.style';

interface IProps extends IDictionary {
	visible: boolean;
}

export const OfflineOverlay: React.SFC<IProps> = ({ visible, dictionary }) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn="slideInDown"
				animationOut="slideOutUp"
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				style={styles.container}
			>
				<SafeAreaView>
					<View style={styles.boxContainer}>
						<ActivityIndicator size="small" color={Colors.white} />
						<Text style={styles.message}>{dictionary.components.modals.offline}</Text>
					</View>
				</SafeAreaView>
			</Modal>
		)}
	</WithManagedTransitions>
);
