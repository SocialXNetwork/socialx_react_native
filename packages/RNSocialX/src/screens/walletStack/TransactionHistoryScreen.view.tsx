import * as React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import {
	ButtonSizes,
	Header,
	HeaderButton,
	PrimaryButton,
	RewardsTransactionItem,
} from '../../components';
import { CoinFullName } from '../../environment/consts';
import { ITransactionData, ITranslatedProps } from '../../types';

import styles, { TRANSACTION_BUTTON_WIDTH } from './TransactionHistoryScreen.style';

interface ITransactionHistoryViewProps extends ITranslatedProps {
	coins: string;
	onGoBack: () => void;
	onSend: () => void;
	onConvert: () => void;
	onViewAccount: () => void;
	refreshing: boolean;
	onRefresh: () => void;
	onEndReached: () => void;
	transactions: ITransactionData[];
}

export const TransactionHistoryScreenView: React.SFC<ITransactionHistoryViewProps> = ({
	onGoBack,
	onSend,
	onConvert,
	onViewAccount,
	refreshing,
	onRefresh,
	onEndReached,
	transactions,
	getText,
	coins,
}) => (
	<View style={styles.container}>
		<Header
			title={getText('transaction.history.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<View style={styles.overviewContainer}>
			<Text style={styles.balance}>{getText('transaction.history.balance').toUpperCase()}</Text>
			<View style={styles.coinContainer}>
				<View style={styles.coins}>
					<Text style={styles.coinValue}>{coins}</Text>
					<Text style={styles.currency}>{CoinFullName.SOCX}</Text>
				</View>
				<TouchableOpacity onPress={onViewAccount}>
					<Text style={styles.accountButton}>{getText('transaction.history.button.account')}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonsContainer}>
				<PrimaryButton
					width={TRANSACTION_BUTTON_WIDTH}
					containerStyle={styles.button}
					label={getText('transaction.history.button.send')}
					size={ButtonSizes.Small}
					onPress={onSend}
				/>
				<PrimaryButton
					width={TRANSACTION_BUTTON_WIDTH}
					containerStyle={styles.button}
					label={getText('transaction.history.button.convert')}
					size={ButtonSizes.Small}
					onPress={onConvert}
				/>
			</View>
		</View>
		<Text style={styles.activity}>{getText('transaction.history.activity').toUpperCase()}</Text>
		<View style={styles.transactionsContainer}>
			<FlatList
				refreshing={refreshing}
				onRefresh={onRefresh}
				showsVerticalScrollIndicator={false}
				onEndReached={onEndReached}
				data={transactions}
				renderItem={(data: { item: ITransactionData; index: number }) => (
					<RewardsTransactionItem {...data.item} />
				)}
				keyExtractor={(item: ITransactionData) => item.id}
			/>
		</View>
	</View>
);
