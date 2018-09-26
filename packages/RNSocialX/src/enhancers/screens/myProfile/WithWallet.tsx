/**
 * TODO list:
 * 1. Data props: wallet
 * 2. Action props: loadMoreTransactions, refreshTransactions, getText
 */

import * as React from 'react';
import { transactions } from '../../../mocks';
import { ITranslatedProps, IWallet, TrendOptions } from '../../../types';

const mock: IWithWalletEnhancedProps = {
	data: {
		wallet: {
			coins: '53,680',
			trendPercentage: '27.21',
			trendArrow: TrendOptions.Up,
			transactions,
			refreshing: false,
		},
	},
	actions: {
		loadMoreTransactions: () => {
			/**/
		},
		refreshTransactions: () => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithWalletEnhancedData {
	wallet: IWallet;
}

export interface IWithWalletEnhancedActions extends ITranslatedProps {
	loadMoreTransactions: () => void;
	refreshTransactions: () => void;
}

interface IWithWalletEnhancedProps {
	data: IWithWalletEnhancedData;
	actions: IWithWalletEnhancedActions;
}

interface IWithWalletProps {
	children(props: IWithWalletEnhancedProps): JSX.Element;
}

interface IWithWalletState {}

export class WithWallet extends React.Component<
	IWithWalletProps,
	IWithWalletState
> {
	render() {
		return this.props.children({ data: mock.data, actions: mock.actions });
	}
}
