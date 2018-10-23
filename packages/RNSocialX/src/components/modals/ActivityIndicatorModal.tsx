import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { ITranslatedProps } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';

import style, { customStyleProps } from './ActivityIndicatorModal.style';

interface IActivityIndicatorModalProps extends ITranslatedProps {
	title: string;
	message: string;
	visible: boolean;
}

export const ActivityIndicatorModal: React.SFC<
	IActivityIndicatorModalProps
> = ({ title = null, message = null, visible, getText }) => (
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
					<ActivityIndicator
						size="large"
						color={customStyleProps.activityIndicatorColor}
					/>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
