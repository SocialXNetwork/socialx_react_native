import numeral from 'numeral';
import * as React from 'react';
import { Alert, Linking, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { IMediaTypes, ITranslatedProps } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';
import styles from './MediaInfoModal.style';

interface IMediaInfoModalProps extends ITranslatedProps {
	visible: boolean;
	mediaHash: string;
	mediaSize: number;
	mediaName: string | null;
	mediaType: IMediaTypes;
	mediaURL: string;
	closeHandler: () => void;
}

const openURL = async (url: string, errorText: string) => {
	try {
		const supported = await Linking.canOpenURL(url);
		if (!supported) {
			Alert.alert(`${errorText}: ${url}`);
		} else {
			return Linking.openURL(url);
		}
	} catch (ex) {
		console.log(ex);
	}
};

export const MediaInfoModal: React.SFC<IMediaInfoModalProps> = ({
	visible,
	mediaHash,
	mediaSize,
	mediaName = null,
	mediaType,
	mediaURL,
	closeHandler,
	getText,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onModalHide, onDismiss }) => (
			<Modal
				// @ts-ignore
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn="zoomIn"
				animationOut="zoomOut"
				onBackButtonPress={closeHandler}
				onBackdropPress={closeHandler}
				style={styles.container}
			>
				<View style={styles.boxContainer}>
					<Text style={styles.title}>{getText('media.info.title')}</Text>
					<View style={styles.infoContainer}>
						<View style={styles.infoTitles}>
							<Text style={styles.fieldTitle}>
								{getText('media.info.hash')}
							</Text>
							<Text style={styles.fieldTitle}>
								{getText('media.info.size')}
							</Text>
							<Text style={styles.fieldTitle}>
								{getText('media.info.name')}
							</Text>
							<Text style={styles.fieldTitle}>
								{getText('media.info.type')}
							</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text
								style={[styles.fieldValue, styles.filedValueLink]}
								numberOfLines={1}
								onPress={() =>
									openURL(mediaURL, getText('message.link.not.supported'))
								}
							>
								{mediaHash}
							</Text>
							<Text style={styles.fieldValue} numberOfLines={1}>
								{numeral(mediaSize).format('0.00 b')}
							</Text>
							<Text style={styles.fieldValue} numberOfLines={1}>
								{mediaName || '-'}
							</Text>
							<Text style={styles.fieldValue} numberOfLines={1}>
								{getText('media.types.' + mediaType.name.toLowerCase())}
							</Text>
						</View>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
