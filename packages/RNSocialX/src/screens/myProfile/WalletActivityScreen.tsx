import * as React from 'react';

import { INavigationProps } from '../../types';
import { WalletActivityScreenView } from './WalletActivityScreen.view';

import {
	IWithWalletEnhancedActions,
	IWithWalletEnhancedData,
	WithWallet,
} from '../../enhancers/screens';

type IWalletActivityScreenProps = INavigationProps &
	IWithWalletEnhancedActions &
	IWithWalletEnhancedData;

export class Screen extends React.Component<IWalletActivityScreenProps> {
	public render() {
		const { wallet } = this.props;

		return (
			<WalletActivityScreenView
				coins={wallet.coins}
				trendPercentage={wallet.trendPercentage}
				trendArrow={wallet.trendArrow}
				transactions={wallet.transactions}
				refreshing={wallet.refreshing}
				onViewAccount={this.onViewAccountHandler}
				onRefresh={this.onRefreshHandler}
				onEndReached={this.onEndReachedHandler}
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onViewAccountHandler = () => {
		this.props.navigation.navigate('SocialXAccountScreen');
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

export const WalletActivityScreen = ({ navigation }: INavigationProps) => (
	<WithWallet>
		{({ data, actions }) => <Screen navigation={navigation} {...data} {...actions} />}
	</WithWallet>
);
