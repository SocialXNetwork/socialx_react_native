import * as React from 'react';
import { Alert } from 'react-native';

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
		const { getText, wallet } = this.props;

		return (
			<TransactionHistoryScreenView
				coins={wallet.coins}
				onViewAccount={this.onViewAccountHandler}
				onGoBack={this.onGoBackHandler}
				onSend={this.onSendHandler}
				onConvert={this.onConvertHandler}
				getText={getText}
				refreshing={wallet.isRefreshing}
				onRefresh={this.onRefreshHandler}
				onEndReached={this.onEndReachedHandler}
				transactions={wallet.rewardsTransactions}
				onViewUserProfile={this.onViewUserProfileHandler}
			/>
		);
	}

	private onViewAccountHandler = () => {
		// this.props.navigation.navigate('SocialXAccountScreen');
		Alert.alert('Navigate to SocialXAccountScreen');
	};

	private onSendHandler = () => {
		Alert.alert('onSendHandler');
	};

	private onConvertHandler = () => {
		Alert.alert('onConvertHandler');
	};

	private onViewUserProfileHandler = (username: string) => {
		Alert.alert(`Navigate to ${username} Profile`);
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
