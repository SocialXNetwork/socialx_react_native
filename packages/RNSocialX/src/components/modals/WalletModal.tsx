import * as React from 'react';
import { Clipboard, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode';
import Icon from 'react-native-vector-icons/Ionicons';

import { PrimaryButton } from '../../components';
import { ITranslatedProps } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';

import styles, { defaultStyles, ELEMENT_WIDTH, QR_WIDTH } from './WalletModal.style';

interface IWalletModalProps extends ITranslatedProps {
	visible: boolean;
	walletAddress: string;
	dismissModal: () => void;
}

const copyToClipboardHandler = (value: string) => {
	Clipboard.setString(value);
};

export const WalletModal: React.SFC<IWalletModalProps> = ({
	visible,
	walletAddress = '19ga5eah9wediewbdib23irbua',
	dismissModal,
	getText,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn="slideInUp"
				animationOut="slideOutUp"
				style={styles.container}
			>
				<View style={styles.box}>
					<Text style={styles.title}>{getText('wallet.receive.coins.title')}</Text>
					<View style={styles.addressContainer}>
						<View style={styles.textContainer}>
							<Text style={styles.message}>{getText('wallet.receive.coins.address')}</Text>
							<Text style={styles.address}>{walletAddress}</Text>
						</View>
						<Icon
							name="ios-copy"
							style={styles.icon}
							onPress={() => copyToClipboardHandler(walletAddress)}
						/>
					</View>
					<View style={styles.qr}>
						<QRCode value={walletAddress} size={QR_WIDTH} />
					</View>
					<PrimaryButton
						label={getText('button.done')}
						width={ELEMENT_WIDTH}
						onPress={dismissModal}
						borderColor={defaultStyles.pink}
					/>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
