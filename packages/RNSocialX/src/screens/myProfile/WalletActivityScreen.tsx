import React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithWalletEnhancedActions,
	IWithWalletEnhancedData,
	WithWallet,
} from '../../enhancers/screens';

import { SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { WalletActivityScreenView } from './WalletActivityScreen.view';

interface IProps extends INavigationProps, IWithWalletEnhancedActions, IWithWalletEnhancedData {
	onGoBack: () => void;
}

export class Screen extends React.Component<IProps> {
	public render() {
		const { wallet, dictionary, onGoBack } = this.props;

		return (
			<WalletActivityScreenView
				coins={wallet.coins}
				trendPercentage={wallet.trendPercentage}
				trendArrow={wallet.trendArrow}
				transactions={wallet.transactions}
				refreshing={wallet.refreshing}
				dictionary={dictionary}
				onViewAccount={this.onViewAccountHandler}
				onRefresh={this.onRefreshHandler}
				onEndReached={this.onEndReachedHandler}
				onGoBack={onGoBack}
			/>
		);
	}

	private onViewAccountHandler = () => {
		this.props.navigation.navigate(SCREENS.SocialXAccount);
	};

	private onRefreshHandler = () => {
		this.props.refreshTransactions();
	};

	private onEndReachedHandler = () => {
		this.props.loadMoreTransactions();
	};
}

export const WalletActivityScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{(nav) => (
			<WithWallet>
				{({ data, actions }) => (
					<Screen {...props} {...data} {...actions} onGoBack={nav.actions.onGoBack} />
				)}
			</WithWallet>
		)}
	</WithNavigationHandlers>
);
