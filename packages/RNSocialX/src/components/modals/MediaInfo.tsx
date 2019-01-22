import numeral from 'numeral';
import * as React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { IDictionary, IMediaTypes } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';

import styles from './MediaInfo.style';

interface IProps extends IDictionary {
	visible: boolean;
	hash: string;
	type: IMediaTypes;
	size?: number;
	onClose: () => void;
}

export const MediaInfo: React.SFC<IProps> = ({
	visible,
	hash,
	size,
	type,
	onClose,
	dictionary,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onModalHide, onDismiss }) => (
			<Modal
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn="zoomIn"
				animationOut="zoomOut"
				onBackButtonPress={onClose}
				onBackdropPress={onClose}
				style={styles.container}
			>
				<View style={styles.boxContainer}>
					<Text style={styles.title}>{dictionary.components.displayers.mediaInfo.title}</Text>
					<View style={styles.infoContainer}>
						<View style={styles.infoTitles}>
							<Text style={styles.fieldTitle}>
								{dictionary.components.displayers.mediaInfo.hash}
							</Text>
							<Text style={styles.fieldTitle}>
								{dictionary.components.displayers.mediaInfo.size}
							</Text>
							<Text style={styles.fieldTitle}>
								{dictionary.components.displayers.mediaInfo.type}
							</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={[styles.fieldValue, styles.filedValueLink]} numberOfLines={1}>
								{hash}
							</Text>
							<Text style={styles.fieldValue} numberOfLines={1}>
								{numeral(size).format('0.00 b')}
							</Text>
							<Text style={styles.fieldValue} numberOfLines={1}>
								{type.name === 'Video'
									? dictionary.components.displayers.mediaInfo.video
									: dictionary.components.displayers.mediaInfo.photo}
							</Text>
						</View>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
