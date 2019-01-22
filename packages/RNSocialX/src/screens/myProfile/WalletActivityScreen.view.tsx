import * as React from 'react';
import { FlatList, Text, View } from 'react-native';

import { Header, MyWalletInfo, TransactionItem } from '../../components';
import { ITransactionData, ITranslatedProps, TREND_OPTIONS } from '../../types';
import styles from './WalletActivityScreen.style';

export interface IWalletActivityScreenViewProps extends ITranslatedProps {
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

export const WalletActivityScreenView: React.SFC<IWalletActivityScreenViewProps> = ({
	coins,
	trendPercentage,
	trendArrow,
	onViewAccount,
	transactions,
	refreshing,
	onRefresh,
	onEndReached,
	onGoBack,
	getText,
}) => {
	return (
		<View style={styles.container}>
			<Header title={getText('wallet.activity.screen.title')} back={true} onPressBack={onGoBack} />
			<View style={styles.walletContainer}>
				<MyWalletInfo
					coins={coins}
					trendPercentage={trendPercentage}
					trendArrow={trendArrow}
					onViewAccount={onViewAccount}
					getText={getText}
				/>
			</View>
			<View style={styles.activity}>
				<Text style={styles.heading}>{getText('wallet.activity.screen.heading')}</Text>
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
};
