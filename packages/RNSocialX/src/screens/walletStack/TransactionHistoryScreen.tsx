import * as React from 'react';

import {
	IWithTransactionHistoryEnhancedActions,
	IWithTransactionHistoryEnhancedData,
	WithTransactionHistory,
} from '../../enhancers/screens';
import { INavigationProps } from '../../types';
import { TransactionHistoryScreenView } from './TransactionHistoryScreen.view';

type ITransactionHistoryScreenProps = INavigationProps &
	IWithTransactionHistoryEnhancedActions &
	IWithTransactionHistoryEnhancedData;

class Screen extends React.Component<ITransactionHistoryScreenProps> {
	public render() {
		const { onSendHandler, onConvertHandler, getText, wallet } = this.props;

		return (
			<TransactionHistoryScreenView
				coins={wallet.coins}
				onViewAccount={this.onViewAccountHandler}
				onGoBack={this.onGoBackHandler}
				onSend={onSendHandler}
				onConvert={onConvertHandler}
				getText={getText}
				refreshing={wallet.isRefreshing}
				onRefresh={this.onRefreshHandler}
				onEndReached={this.onEndReachedHandler}
				transactions={wallet.transactions}
			/>
		);
	}

	private onViewAccountHandler = () => {
		// this.props.navigation.navigate('SocialXAccountScreen');
		console.log('View Account Button');
	};

	private onRefreshHandler = () => {
		this.props.refreshTransactions();
	};

	private onEndReachedHandler = () => {
		this.props.loadMoreTransactions();
	};

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const TransactionHistoryScreen = (props: INavigationProps) => (
	<WithTransactionHistory>
		{({ data, actions }) => <Screen {...props} {...data} {...actions} />}
	</WithTransactionHistory>
);
