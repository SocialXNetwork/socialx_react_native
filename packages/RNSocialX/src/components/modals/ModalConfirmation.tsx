import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {ITranslatedProps} from '../../types';
import {WithManagedTransitions} from '../managedTransitions';
import style from './ModalConfirmation.style';

interface IModalConfirmationPropsExtended extends ITranslatedProps {
	confirmActive: boolean;
	title: string | null;
	message: string | null;
	confirmButton: string;
	cancelButton: string;
	confirmHandler: () => void;
	declineHandler: () => void;
}

export const ModalConfirmation: React.SFC<IModalConfirmationPropsExtended> = ({
	confirmActive,
	title = null,
	message = null,
	confirmButton = 'button.yes',
	cancelButton = 'button.no',
	confirmHandler = () => {
		/**/
	},
	declineHandler = () => {
		/**/
	},
	getText,
}) => (
	<WithManagedTransitions modalVisible={confirmActive}>
		{({onDismiss, onModalHide}) => (
			<Modal
				isVisible={confirmActive}
				backdropOpacity={0.2}
				animationIn={'zoomIn'}
				animationOut={'zoomOut'}
				onBackdropPress={declineHandler}
				style={style.container}
				// @ts-ignore // lib. TS issue!
				onDismiss={onDismiss}
				onModalHide={onModalHide}
			>
				<View style={style.boxContainer}>
					{title && (
						<View style={style.titleBorder}>
							<Text style={style.title}>{getText(title)}</Text>
						</View>
					)}
					{message && (
						<View style={style.messageBorder}>
							<Text style={style.message}>{getText(message)}</Text>
						</View>
					)}
					<View style={style.buttonsContainer}>
						<TouchableOpacity style={[style.button, style.leftButton]} onPress={declineHandler}>
							<Text style={[style.buttonText, style.buttonTextCancel]}>{getText(cancelButton)}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={confirmHandler}>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>{getText(confirmButton)}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
