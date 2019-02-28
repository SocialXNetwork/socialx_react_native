import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Header, PrimaryButton, PrimaryTextInput } from '../../components';
import { ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './WalletKeys.style';

interface IWalletKeysScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	ownerPub: string;
	creatorPub: string;
	ownerPriv: string;
	creatorPriv: string;
	onExportKeys: () => void;
	onFinalize: () => void;
}

export const WalletKeysScreenView: React.SFC<IWalletKeysScreenViewProps> = ({
	onGoBack,
	ownerPub,
	creatorPub,
	ownerPriv,
	creatorPriv,
	onExportKeys,
	onFinalize,
	getText,
}) => (
	<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
		<Header title={getText('wallet.keys.title')} back={true} onPressBack={onGoBack} />
		<View style={styles.content}>
			<Text style={styles.label}>{getText('wallet.keys.owner.public')}</Text>
			<View style={styles.input}>
				<PrimaryTextInput
					disabled={true}
					value={ownerPub}
					iconColor={defaultStyles.pink}
					icon="key"
				/>
			</View>
			<Text style={styles.label}>{getText('wallet.keys.creator.public')}</Text>
			<View style={styles.input}>
				<PrimaryTextInput
					disabled={true}
					value={creatorPub}
					iconColor={defaultStyles.pink}
					icon="key"
				/>
			</View>
			<Text style={styles.label}>{getText('wallet.keys.owner.private')}</Text>
			<View style={styles.input}>
				<PrimaryTextInput
					disabled={true}
					value={ownerPriv}
					isPassword={true}
					iconColor={defaultStyles.pink}
					icon="key"
				/>
			</View>
			<Text style={styles.label}>{getText('wallet.keys.creator.private')}</Text>
			<View style={styles.input}>
				<PrimaryTextInput
					disabled={true}
					value={creatorPriv}
					isPassword={true}
					iconColor={defaultStyles.pink}
					icon="key"
				/>
			</View>
			<Text style={styles.label}>{getText('wallet.keys.input.label')}</Text>
			<View style={styles.buttons}>
				<PrimaryButton
					label={getText('button.export')}
					onPress={onExportKeys}
					containerStyle={styles.button}
				/>
				<PrimaryButton label={getText('button.finalize')} onPress={onFinalize} />
			</View>
		</View>
	</ScrollView>
);
