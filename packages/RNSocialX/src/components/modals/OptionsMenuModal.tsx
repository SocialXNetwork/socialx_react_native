// TODO: consider adding a title here for this menu.

import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

import { IOptionsMenuItem } from '../../types';
import { ModalManager, WithManagedTransitions } from '../managedTransitions';

import styles from './OptionsMenuModal.style';

interface IOptionsMenuModalProps {
	visible: boolean;
	items: IOptionsMenuItem[];
	onBackdropPress: () => void;
}

export const OptionsMenuModal: React.SFC<IOptionsMenuModalProps> = ({
	visible,
	items,
	onBackdropPress,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				onBackdropPress={onBackdropPress}
				style={styles.container}
			>
				<SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.innerContainer}>
					{items.map(({ icon, label, actionHandler }: IOptionsMenuItem, index: number) => {
						const itemStyles = [
							styles.row,
							index === 0 ? [styles.first] : {},
							index !== items.length - 1 ? styles.separator : {},
						];

						return (
							<TouchableOpacity
								style={itemStyles}
								key={index}
								onPress={() => {
									onBackdropPress();
									ModalManager.safeRunAfterModalClosed(actionHandler);
								}}
							>
								<View style={styles.iconContainer}>
									<Icon name={icon} style={styles.icon} />
								</View>
								<View style={styles.textContainer}>
									<Text>{label}</Text>
								</View>
							</TouchableOpacity>
						);
					})}
				</SafeAreaView>
			</Modal>
		)}
	</WithManagedTransitions>
);
