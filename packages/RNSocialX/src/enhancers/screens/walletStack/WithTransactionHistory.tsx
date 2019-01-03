/**
 * TODO list:
 * 1. Data props: wallet
 * 2. Action props: onSendHandler, onConvertHandler, loadMoreTransactions, refreshTransactions
 */

import * as React from 'react';
import { transactions } from '../../../mocks';
import { IRewardsTransactionHistory, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithTransactionHistoryEnhancedProps = {
	data: {
		wallet: {
			coins: '53,680',
			transactions,
			isRefreshing: false,
		},
	},
	actions: {
		onSendHandler: () => {
			/**/
		},
		onConvertHandler: () => {
			/**/
		},
		loadMoreTransactions: () => {
			/**/
		},
		refreshTransactions: () => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithTransactionHistoryEnhancedData {
	wallet: IRewardsTransactionHistory;
}

export interface IWithTransactionHistoryEnhancedActions extends ITranslatedProps {
	onSendHandler: () => void;
	onConvertHandler: () => void;
	loadMoreTransactions: () => void;
	refreshTransactions: () => void;
}

interface IWithTransactionHistoryEnhancedProps {
	data: IWithTransactionHistoryEnhancedData;
	actions: IWithTransactionHistoryEnhancedActions;
}

interface IWithTransactionHistoryProps {
	children(props: IWithTransactionHistoryEnhancedProps): JSX.Element;
}

export class WithTransactionHistory extends React.Component<IWithTransactionHistoryProps> {
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
