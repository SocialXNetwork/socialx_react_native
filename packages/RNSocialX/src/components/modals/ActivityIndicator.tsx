import * as React from 'react';
import { ActivityIndicator as Loader, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { Colors } from '../../environment/theme';
import { ITranslatedProps } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';

import style from './ActivityIndicator.style';

interface IProps extends ITranslatedProps {
	title: string;
	message: string;
	visible: boolean;
}

export const ActivityIndicator: React.SFC<IProps> = ({
	title = null,
	message = null,
	visible,
	getText,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn="slideInDown"
				animationOut="slideOutUp"
				style={style.container}
			>
				<View style={style.boxContainer}>
					<Text style={style.title}>{title || getText('please.wait')}</Text>
					{message && <Text style={style.message}>{message}</Text>}
					<Loader size="large" color={Colors.pink} />
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
