import * as React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-navigation';

import {WithManagedTransitions} from '../managedTransitions';
import styles from './DotsMenuModal.style';

export interface DotsMenuItem {
	label: string;
	icon: string;
	actionHandler: () => void;
}

interface IDotsMenuModalProps {
	visible: boolean;
	items: DotsMenuItem[];
	onBackdropPress: () => void;
}

export const DotsMenuModal: React.SFC<IDotsMenuModalProps> = ({visible, items, onBackdropPress}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({onDismiss, onModalHide}) => (
			<Modal
				// @ts-ignore
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn={'slideInUp'}
				animationOut={'slideOutDown'}
				onBackdropPress={onBackdropPress}
				style={styles.container}
			>
				<SafeAreaView style={styles.innerContainer}>
					{items.map((item: DotsMenuItem, index: number) => {
						if (index === 0) {
							return (
								<View style={[styles.row, styles.first, styles.separator]} key={index}>
									<View style={styles.iconContainer}>
										<Icon name={item.icon} style={styles.icon} />
									</View>
									<View style={styles.textContainer}>
										<Text>{item.label}</Text>
									</View>
								</View>
							);
						} else if (index !== items.length - 1) {
							return (
								<View style={[styles.row, styles.separator]} key={index}>
									<View style={styles.iconContainer}>
										<Icon name={item.icon} style={styles.icon} />
									</View>
									<View style={styles.textContainer}>
										<Text>{item.label}</Text>
									</View>
								</View>
							);
						}

						return (
							<View style={styles.row} key={index}>
								<View style={styles.iconContainer}>
									<Icon name={item.icon} style={styles.icon} />
								</View>
								<View style={styles.textContainer}>
									<Text>{item.label}</Text>
								</View>
							</View>
						);
					})}
				</SafeAreaView>
			</Modal>
		)}
	</WithManagedTransitions>
);
