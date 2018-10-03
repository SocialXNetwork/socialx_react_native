import * as React from 'react';
import { Text, View } from 'react-native';

import {
	Header,
	HeaderButton,
	PrimaryButton,
	PrimaryTextInput,
	TRKeyboardKeys,
} from '../../components';
import { ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './WalletAccount.style';

interface IWalletAccountScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	onGoNext: () => void;
	onChangeAccountName: (accountName: string) => void;
	accountName: string;
	isValid: boolean | undefined;
	onGenerateAccountName: () => void;
}

export const WalletAccountScreenView: React.SFC<
	IWalletAccountScreenViewProps
> = ({
	onGoBack,
	onGoNext,
	onChangeAccountName,
	accountName,
	isValid,
	onGenerateAccountName,
	getText,
}) => (
	<View style={styles.container}>
		<Header
			title={getText('wallet.account.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<View style={styles.content}>
			<Text style={styles.label}>{getText('wallet.account.input.label')}</Text>
			<PrimaryTextInput
				onChangeText={onChangeAccountName}
				value={accountName}
				placeholder={getText('wallet.account.input.placeholder')}
				iconColor={defaultStyles.pink}
				icon="user"
				blurOnSubmit={true}
				returnKeyType={TRKeyboardKeys.default}
			/>
			{isValid === false && (
				<Text style={[styles.label, styles.error]}>
					{getText('wallet.account.not.valid')}
				</Text>
			)}
			<View style={styles.buttons}>
				<PrimaryButton
					label={getText('button.generate')}
					onPress={onGenerateAccountName}
					containerStyle={styles.button}
				/>
				<PrimaryButton label={getText('button.next')} onPress={onGoNext} />
			</View>
		</View>
	</View>
);
