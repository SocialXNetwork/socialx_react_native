import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import {
	IWithGenericModalEnhancedActions,
	IWithGenericModalEnhancedData,
	WithGenericModal,
} from '../../enhancers/components';
import { MODAL_TYPES } from '../../types';

import styles from './GenericModal.style';

interface IGenericModalProps {
	onDeletePress: (alias: string) => void;
}

interface IProps
	extends IGenericModalProps,
		IWithGenericModalEnhancedActions,
		IWithGenericModalEnhancedData {}

const Component: React.SFC<IProps> = ({ modal, hideModal, onDeletePress }) => {
	const { type, payload } = modal;

	if (type && type === MODAL_TYPES.DELETE && payload) {
		return (
			<Modal
				isVisible={true}
				animationIn="fadeIn"
				animationOut="fadeOut"
				backdropOpacity={0.5}
				hideModalContentWhileAnimating={true}
				style={styles.modal}
			>
				<View style={styles.container}>
					<View style={styles.details}>
						<Text style={styles.title}>Delete conversation?</Text>
						<Text style={styles.description}>
							This will permanently delete the conversation history.
						</Text>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							onDeletePress(payload);
							hideModal();
						}}
					>
						<Text style={[styles.normal, styles.danger]}>Delete</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={hideModal}>
						<Text style={styles.normal}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}

	return null;
};

export const GenericModal: React.SFC<IGenericModalProps> = (props) => (
	<WithGenericModal>
		{({ data, actions }) => <Component {...props} {...data} {...actions} />}
	</WithGenericModal>
);
