import moment from 'moment';
import numeral from 'numeral';
import * as React from 'react';
import { Animated, Easing, LayoutChangeEvent } from 'react-native';

import {
	dateFormatMomentJS,
	IMonthlyBarChartData,
	ISpentTillNow,
	IWeeklyBarChartData,
} from '../../environment/consts';
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

interface IAdsStatisticsScreenState {
	selectedSpentButton: ISpentTillNow;
	translateX: Animated.Value;
}

class Screen extends React.Component<IAdsStatisticsScreenProps, IAdsStatisticsScreenState> {
	public state = {
		selectedSpentButton: ISpentTillNow.weekly,
		translateX: new Animated.Value(0),
	};

	private slideWidth = 0;
	private maxWeeklyValue = 0;
	private maxMonthlyValue = 0;

	public render() {
		const { transactions, totalAmountSOCX, weeklySeries, monthlySeries } = this.props;
		const { selectedSpentButton, translateX } = this.state;
		const totalAmountSOCXFormatted = numeral(totalAmountSOCX).format('0.000a');
		transactions.map((transaction) => {
			transaction.date = moment(transaction.date, 'MMMM DD, YYYY h:mm:ss').format(
				dateFormatMomentJS.statisticsScreen,
			);
		});

		this.maxWeeklyValue = this.getMaxSeriesValue(weeklySeries);
		this.maxMonthlyValue = this.getMaxSeriesValue(monthlySeries);

		return (
			<AdsStatisticsScreenView
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
				transactions={transactions}
				onShowAllTransactions={this.onShowAllTransactions}
				handleStatistics={this.handleStatistics}
				selectedSpentButton={selectedSpentButton}
				totalAmountSOCX={totalAmountSOCXFormatted}
				translateXValue={translateX}
				weeklyChartContainerOnLayout={this.weeklyChartContainerOnLayout}
				weeklySeries={weeklySeries}
				monthlySeries={monthlySeries}
				maxWeeklyValue={this.maxWeeklyValue}
				maxMonthlyValue={this.maxMonthlyValue}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onShowAllTransactions = () => {
		console.log('TO DO: navigate to all transactions');
	};

	private handleStatistics = (buttonSelected: ISpentTillNow) => {
		if (buttonSelected === ISpentTillNow.weekly) {
			this.setState({
				selectedSpentButton: ISpentTillNow.weekly,
			});
			this.runSlideTransition(ISpentTillNow.weekly);
		}
		if (buttonSelected === ISpentTillNow.monthly) {
			this.setState({
				selectedSpentButton: ISpentTillNow.monthly,
			});
			this.runSlideTransition(ISpentTillNow.monthly);
		}
	};

	private runSlideTransition = (tab: ISpentTillNow) => {
		const slideValue = tab === ISpentTillNow.monthly ? -this.slideWidth : 0;
		Animated.timing(this.state.translateX, {
			toValue: slideValue,
			easing: Easing.linear,
			duration: 300,
			isInteraction: false,
			useNativeDriver: true,
		}).start();
	};

	private weeklyChartContainerOnLayout = (event: LayoutChangeEvent) => {
		this.slideWidth = event.nativeEvent.layout.width;
	};

	private getMaxSeriesValue = (series: IWeeklyBarChartData[] | IMonthlyBarChartData[]) => {
		let ret = 0;
		for (const weeklyData of series) {
			if (weeklyData.value > ret) {
				ret = weeklyData.value;
			}
		}
		return ret;
	};
}

export const AdsStatisticsScreen = (navProps: INavigationProps) => (
	<WithAdsStatistics>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithAdsStatistics>
);
