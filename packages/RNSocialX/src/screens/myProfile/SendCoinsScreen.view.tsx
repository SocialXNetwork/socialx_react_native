import * as React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

import {
	Header,
	HeaderButton,
	PrimaryButton,
	SendCoinsHeader,
	TKeyboardKeys,
	TRKeyboardKeys,
} from '../../components';

import { ITranslatedProps } from '../../types';
import styles, { defaultStyles } from './SendCoinsScreen.style';

interface ISendCoinsScreenViewProps extends ITranslatedProps {
	coins: number;
	user: string;
	transferAmount: string;
	secondInputRef: React.RefObject<TextInput>;
	onSendCoins: () => void;
	onTransferAmountChange: (value: string) => void;
	onUserChange: (value: string) => void;
	onUserSubmit: () => void;
	onGoBack: () => void;
}

export const SendCoinsScreenView: React.SFC<ISendCoinsScreenViewProps> = ({
	coins,
	user,
	transferAmount,
	secondInputRef,
	onSendCoins,
	onTransferAmountChange,
	onUserChange,
	onUserSubmit,
	onGoBack,
	getText,
}) => (
	<SafeAreaView style={styles.container}>
		<Header
			title={getText('wallet.send.coins.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<ScrollView
			contentContainerStyle={styles.contentContainer}
			keyboardShouldPersistTaps="handled"
			alwaysBounceVertical={false}
		>
			<View>
				<SendCoinsHeader coins={coins} />
				<View style={styles.middleContainer}>
					<View style={styles.firstInputContainer}>
						<TextInput
							style={styles.textInputFirst}
							autoFocus={true}
							onChangeText={onUserChange}
							value={user}
							onSubmitEditing={onUserSubmit}
							returnKeyType={TRKeyboardKeys.next}
							autoCorrect={false}
							underlineColorAndroid={defaultStyles.transparent}
							autoCapitalize="none"
							blurOnSubmit={false}
						/>
						<Text style={styles.inputLabel}>{getText('text.user')}</Text>
					</View>
					<View style={styles.borderLine} />
					<View style={styles.secondInputContainer}>
						<TextInput
							ref={secondInputRef}
							style={styles.textInputSecond}
							onChangeText={onTransferAmountChange}
							value={transferAmount}
							keyboardType={TKeyboardKeys.numeric}
							autoCorrect={false}
							underlineColorAndroid={defaultStyles.transparent}
							autoCapitalize="none"
							blurOnSubmit={true}
						/>
						<Text style={styles.inputLabel}>SOCX</Text>
					</View>
				</View>
			</View>
			<View style={styles.continueButtonContainer}>
				<PrimaryButton label={getText('button.continue')} onPress={onSendCoins} />
			</View>
		</ScrollView>
	</SafeAreaView>
);
