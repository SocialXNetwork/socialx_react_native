import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicon from 'react-native-vector-icons/Octicons';
import { SafeAreaView } from 'react-navigation';

import { ICON_TYPES } from '../../environment/consts';
import { IOptionsMenuItem } from '../../types';
import { ModalManager, WithManagedTransitions } from '../managedTransitions';

import styles from './OptionsMenu.style';

interface IProps {
	visible: boolean;
	items: IOptionsMenuItem[];
	onBackdropPress: () => void;
}

export const OptionsMenu: React.SFC<IProps> = ({ visible, items, onBackdropPress }) => (
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
					{items.map(({ icon, label, source, actionHandler }: IOptionsMenuItem, index: number) => {
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
									{!source && <Ionicon name={icon} style={styles.icon} />}
									{source === ICON_TYPES.OCT && <Octicon name={icon} style={styles.oct} />}
									{source === ICON_TYPES.ENT && <Entypo name={icon} style={styles.icon} />}
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
