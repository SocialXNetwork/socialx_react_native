/**
 * TODO list:
 * 1. Data props: wallet
 * 2. Action props: loadMoreTransactions, refreshTransactions
 */

import * as React from 'react';
import { transactions } from '../../../mocks';
import { ITranslatedProps, IWallet, TREND_OPTIONS } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithWalletEnhancedProps = {
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

export class WithWallet extends React.Component<IWithWalletProps> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) =>
					this.props.children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
