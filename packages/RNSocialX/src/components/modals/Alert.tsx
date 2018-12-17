import * as React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { ITranslatedProps } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';

import style from './Alert.style';

interface IProps extends ITranslatedProps {
	title: string;
	message: string;
	visible: boolean;
}

export const Alert: React.SFC<IProps> = ({ visible, getText }) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				style={style.container}
			>
				<View style={style.boxContainer} />
			</Modal>
		)}
	</WithManagedTransitions>
);
