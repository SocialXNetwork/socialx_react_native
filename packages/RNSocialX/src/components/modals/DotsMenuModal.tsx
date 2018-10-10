import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

import { WithManagedTransitions } from '../managedTransitions';
import styles from './DotsMenuModal.style';

export interface IDotsMenuItem {
	label: string;
	icon: string;
	actionHandler: () => void;
}

interface IDotsMenuModalProps {
	visible: boolean;
	items: IDotsMenuItem[];
	onBackdropPress: () => void;
}

export const DotsMenuModal: React.SFC<IDotsMenuModalProps> = ({
	visible,
	items,
	onBackdropPress,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				// @ts-ignore
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				onBackdropPress={onBackdropPress}
				style={styles.container}
			>
				<SafeAreaView
					forceInset={{ bottom: 'always' }}
					style={styles.innerContainer}
				>
					{items.map(
						({ icon, label, actionHandler }: IDotsMenuItem, index: number) => {
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
										actionHandler();
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
						},
					)}
				</SafeAreaView>
			</Modal>
		)}
	</WithManagedTransitions>
);
