/**
 * TODO list:
 * 1. Props data: latest 3 transactions, total amount of SOCX that user has
 * 2. Props actions: onShowAllTransactions: should redirect to a screen with all transactions.
 */

import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithAdsStatisticsEnhancedProps = {
	data: {
		transactions: [
			{
				number: 1,
				date: new Date('February 12, 2018 11:49:00'),
			},
			{
				number: 2,
				date: new Date('April 05, 2018 11:49:00'),
			},
			{
				number: 3,
				date: new Date('August 28, 2018 11:49:00'),
			},
		],
		totalAmountSOCX: 2568,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		onShowAllTransactions: () => {
			/* */
		},
	},
};

export interface IWithAdsStatisticsEnhancedData {
	transactions: Array<{
		number: number;
		date: Date | string;
	}>;
	totalAmountSOCX: number;
}

export interface IWithAdsStatisticsEnhancedActions extends ITranslatedProps {
	onShowAllTransactions: () => void;
}

interface IWithAdsStatisticsEnhancedProps {
	data: IWithAdsStatisticsEnhancedData;
	actions: IWithAdsStatisticsEnhancedActions;
}

interface IWithAdsStatisticsProps {
	children(props: IWithAdsStatisticsEnhancedProps): JSX.Element;
}

interface IWithAdsStatisticsState {}

export class WithAdsStatistics extends React.Component<
	IWithAdsStatisticsProps,
	IWithAdsStatisticsState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) =>
					this.props.children({
						data: {
							...mock.data,
						},
						actions: {
							...mock.actions,
							getText: i18nProps.getText,
						},
					})
				}
			</WithI18n>
		);
	}
}
