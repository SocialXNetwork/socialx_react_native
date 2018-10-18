import moment from 'moment';
import * as React from 'react';

import { dateFormatMomentJS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { AdsStatisticsScreenView } from './AdsStatisticsScreen.view';

import {
	IWithAdsStatisticsEnhancedActions,
	IWithAdsStatisticsEnhancedData,
	WithAdsStatistics,
} from '../../enhancers/screens';

type IAdsStatisticsScreenProps = INavigationProps &
	IWithAdsStatisticsEnhancedActions &
	IWithAdsStatisticsEnhancedData;

class Screen extends React.Component<IAdsStatisticsScreenProps> {
	public state = {
		weeklySelected: true,
		monthlySelected: false,
	};

	public render() {
		const { transactions, totalAmountSOCX } = this.props;
		const { weeklySelected, monthlySelected } = this.state;
		transactions.map((transaction) => {
			transaction.date = moment(
				transaction.date,
				'MMMM DD, YYYY h:mm:ss',
			).format(dateFormatMomentJS.statisticsScreen);
		});

		return (
			<AdsStatisticsScreenView
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
				transactions={transactions}
				onShowAllTransactions={this.onShowAllTransactions}
				handleStatistics={this.handleStatistics}
				weeklySelected={weeklySelected}
				monthlySelected={monthlySelected}
				totalAmountSOCX={totalAmountSOCX}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onShowAllTransactions = () => {
		/* */
	};

	private handleStatistics = (buttonSelected: 'weekly' | 'monthly') => {
		if (buttonSelected === 'weekly') {
			this.setState({
				monthlySelected: false,
				weeklySelected: true,
			});
		}
		if (buttonSelected === 'monthly') {
			this.setState({
				monthlySelected: true,
				weeklySelected: false,
			});
		}
	};
}

export const AdsStatisticsScreen = (navProps: INavigationProps) => (
	<WithAdsStatistics>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithAdsStatistics>
);
