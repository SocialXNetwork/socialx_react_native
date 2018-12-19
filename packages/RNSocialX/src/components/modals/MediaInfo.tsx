import numeral from 'numeral';
import * as React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { IMediaTypes, ITranslatedProps } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';

import styles from './MediaInfo.style';

interface IProps extends ITranslatedProps {
	visible: boolean;
	hash: string;
	size: number;
	type: IMediaTypes;
	onClose: () => void;
}

export const MediaInfo: React.SFC<IProps> = ({ visible, hash, size, type, onClose, getText }) => (
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
					<Text style={styles.title}>{getText('media.info.title')}</Text>
					<View style={styles.infoContainer}>
						<View style={styles.infoTitles}>
							<Text style={styles.fieldTitle}>{getText('media.info.hash')}</Text>
							<Text style={styles.fieldTitle}>{getText('media.info.size')}</Text>
							<Text style={styles.fieldTitle}>{getText('media.info.type')}</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={[styles.fieldValue, styles.filedValueLink]} numberOfLines={1}>
								{hash}
							</Text>
							<Text style={styles.fieldValue} numberOfLines={1}>
								{numeral(size).format('0.00 b')}
							</Text>
							<Text style={styles.fieldValue} numberOfLines={1}>
								{getText('media.types.' + type.name.toLowerCase())}
							</Text>
						</View>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
