import * as React from 'react';
import { FlatList, Text, View } from 'react-native';

import { Header, MyWalletInfo, TransactionItem } from '../../components';
import { IDictionary, ITransactionData, TREND_OPTIONS } from '../../types';
import styles from './WalletActivityScreen.style';

interface IProps extends IDictionary {
	coins: string;
	trendPercentage: string;
	trendArrow: TREND_OPTIONS;
	transactions: ITransactionData[];
	refreshing: boolean;
	onViewAccount: () => void;
	onRefresh: () => void;
	onEndReached: () => void;
	onGoBack: () => void;
}

export const WalletActivityScreenView: React.SFC<IProps> = ({
	coins,
	trendPercentage,
	trendArrow,
	transactions,
	refreshing,
	dictionary,
	onViewAccount,
	onRefresh,
	onEndReached,
	onGoBack,
}) => (
	<View style={styles.container}>
		<Header title={dictionary.screens.wallet.activity.title} back={true} onPressBack={onGoBack} />
		<View style={styles.walletContainer}>
			<MyWalletInfo
				coins={coins}
				trendPercentage={trendPercentage}
				trendArrow={trendArrow}
				dictionary={dictionary}
				onViewAccount={onViewAccount}
			/>
		</View>
		<View style={styles.activity}>
			<Text style={styles.heading}>{dictionary.screens.wallet.activity.heading}</Text>
			<FlatList
				showsVerticalScrollIndicator={false}
				refreshing={refreshing}
				onRefresh={onRefresh}
				onEndReached={onEndReached}
				data={transactions}
				renderItem={(data: { item: ITransactionData; index: number }) => (
					<TransactionItem {...data.item} />
				)}
				keyExtractor={(item: ITransactionData) => item.id}
			/>
		</View>
	</View>
);
