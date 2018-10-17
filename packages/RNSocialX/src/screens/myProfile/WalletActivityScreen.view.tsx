import * as React from 'react';
import { FlatList, Text, View } from 'react-native';

import {
	Header,
	HeaderButton,
	MyWalletInfo,
	TransactionItem,
} from '../../components';
import { ITransactionData, ITranslatedProps, TrendOptions } from '../../types';
import styles from './WalletActivityScreen.style';

export interface IWalletActivityScreenViewProps extends ITranslatedProps {
	coins: string;
	trendPercentage: string;
	trendArrow: TrendOptions;
	onViewAccount: () => void;
	transactions: ITransactionData[];
	refreshing: boolean;
	onRefresh: () => void;
	onEndReached: () => void;
	onGoBack: () => void;
}

export const WalletActivityScreenView: React.SFC<
	IWalletActivityScreenViewProps
> = ({
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
			<Header
				title={getText('wallet.activity.screen.title')}
				left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
			/>
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
				<Text style={styles.heading}>
					{getText('wallet.activity.screen.heading')}
				</Text>
				<FlatList
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
