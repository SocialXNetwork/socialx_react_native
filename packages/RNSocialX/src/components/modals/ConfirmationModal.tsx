import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { WithManagedTransitions } from '../managedTransitions';
import style from './ConfirmationModal.style';

interface IConfirmationModalProps {
	confirmActive: boolean;
	title: string | null;
	message: string | null;
	confirmButton?: string;
	cancelButton?: string;
	confirmHandler: () => void;
	declineHandler: () => void;
}

export const ConfirmationModal: React.SFC<IConfirmationModalProps> = ({
	confirmActive,
	title = null,
	message = null,
	confirmButton = 'Yes',
	cancelButton = 'No',
	confirmHandler = () => {
		/**/
	},
	declineHandler = () => {
		/**/
	},
}) => (
	<WithManagedTransitions modalVisible={confirmActive}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				isVisible={confirmActive}
				backdropOpacity={0.5}
				animationIn="zoomIn"
				animationOut="zoomOut"
				onBackdropPress={declineHandler}
				style={style.container}
				// @ts-ignore
				onDismiss={onDismiss}
				onModalHide={onModalHide}
			>
				<View style={style.boxContainer}>
					{title && (
						<View style={style.titleBorder}>
							<Text style={style.title}>{title}</Text>
						</View>
					)}
					{message && (
						<View style={style.messageBorder}>
							<Text style={style.message}>{message}</Text>
						</View>
					)}
					<View style={style.buttonsContainer}>
						<TouchableOpacity
							style={[style.button, style.leftButton]}
							onPress={declineHandler}
						>
							<Text style={[style.buttonText, style.buttonTextCancel]}>
								{cancelButton}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={confirmHandler}>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>
								{confirmButton}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
