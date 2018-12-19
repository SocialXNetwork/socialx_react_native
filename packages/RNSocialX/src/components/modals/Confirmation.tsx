import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { WithManagedTransitions } from '../managedTransitions';
import style from './Confirmation.style';

interface IProps {
	confirmActive: boolean;
	title: string | null;
	message: string | null;
	confirmButton?: string;
	cancelButton?: string;
	onConfirm: () => void;
	onDecline: () => void;
}

export const Confirmation: React.SFC<IProps> = ({
	confirmActive,
	title = null,
	message = null,
	confirmButton = 'Yes',
	cancelButton = 'No',
	onConfirm = () => undefined,
	onDecline = () => undefined,
}) => (
	<WithManagedTransitions modalVisible={confirmActive}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				isVisible={confirmActive}
				backdropOpacity={0.5}
				animationIn="zoomIn"
				animationOut="zoomOut"
				onBackdropPress={onDecline}
				style={style.container}
				onDismiss={onDismiss}
				onModalHide={onModalHide}
			>
				<View style={style.boxContainer}>
					{title && (
						<View style={style.titleContainer}>
							<Text style={style.title}>{title}</Text>
						</View>
					)}
					{message && (
						<View style={style.messageContainer}>
							<Text style={style.message}>{message}</Text>
						</View>
					)}
					<View style={style.buttonsContainer}>
						<TouchableOpacity style={[style.button, style.leftButton]} onPress={onDecline}>
							<Text style={[style.buttonText, style.buttonTextCancel]}>{cancelButton}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={onConfirm}>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>{confirmButton}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
