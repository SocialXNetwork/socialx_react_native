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
	onDeletePress?: (alias: string) => void;
}

interface IProps
	extends IGenericModalProps,
		IWithGenericModalEnhancedActions,
		IWithGenericModalEnhancedData {}

const Component: React.SFC<IProps> = ({ modal, dictionary, hideModal, onDeletePress }) => {
	const { type, payload } = modal;

	return (
		<Modal
			isVisible={type === MODAL_TYPES.DELETE}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropOpacity={0.5}
			hideModalContentWhileAnimating={true}
			style={styles.modal}
		>
			{type === MODAL_TYPES.DELETE && (
				<View style={styles.container}>
					<View style={styles.details}>
						<Text style={styles.title}>{dictionary.components.modals.generic.delete.title}</Text>
						<Text style={styles.description}>
							{dictionary.components.modals.generic.delete.description}
						</Text>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							if (payload && onDeletePress) {
								onDeletePress(payload);
								hideModal();
							}
						}}
					>
						<Text style={[styles.normal, styles.danger]}>
							{dictionary.components.buttons.delete}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={hideModal}>
						<Text style={styles.normal}>{dictionary.components.buttons.cancel}</Text>
					</TouchableOpacity>
				</View>
			)}
		</Modal>
	);
};

export const GenericModal: React.SFC<IGenericModalProps> = (props) => (
	<WithGenericModal>
		{({ data, actions }) => <Component {...props} {...data} {...actions} />}
	</WithGenericModal>
);
