import React from 'react';

import { transactions } from '../../../mocks';
import { IDictionary, IWallet, TREND_OPTIONS } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithWalletEnhancedProps = {
	// @ts-ignore
	data: {
		wallet: {
			coins: '53,680',
			trendPercentage: '27.21',
			trendArrow: TREND_OPTIONS.UP,
			transactions,
			refreshing: false,
		},
	},
	actions: {
		loadMoreTransactions: () => undefined,
		refreshTransactions: () => undefined,
	},
};

export interface IWithWalletEnhancedData extends IDictionary {
	wallet: IWallet;
}

export interface IWithWalletEnhancedActions {
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

export class WithWallet extends React.Component<IWithWalletProps> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) =>
					this.props.children({
						data: { ...mock.data, dictionary },
						actions: { ...mock.actions },
					})
				}
			</WithI18n>
		);
	}
}
