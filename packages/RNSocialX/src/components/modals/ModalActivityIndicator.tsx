import * as React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {WithManagedTransitions} from '../managedTransitions';
import style, {customStyleProps} from './ModalActivityIndicator.style';

interface IModalActivityIndicatorProps {
	activityIndicatorTitle: string | null;
	activityIndicatorMessage: string | null;
	showActivityIndicator: boolean;
}

export const ModalActivityIndicator: React.SFC<IModalActivityIndicatorProps> = ({
	activityIndicatorTitle = null,
	activityIndicatorMessage = null,
	showActivityIndicator,
}) => (
	<WithManagedTransitions modalVisible={showActivityIndicator}>
		{({onDismiss, onModalHide}) => (
			<Modal
				// @ts-ignore // lib. TS issue, onDismiss prop is inherited from Modal in 'react-native'
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={showActivityIndicator}
				backdropOpacity={0.2}
				animationIn={'slideInDown'}
				animationOut={'slideOutUp'}
				style={style.container}
			>
				<View style={style.boxContainer}>
					<Text style={style.title}>{activityIndicatorTitle || 'Please wait'}</Text>
					{activityIndicatorMessage && <Text style={style.message}>{activityIndicatorMessage}</Text>}
					<ActivityIndicator size={'large'} color={customStyleProps.activityIndicatorColor} />
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
