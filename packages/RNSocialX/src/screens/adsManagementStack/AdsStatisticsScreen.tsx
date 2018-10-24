import moment from 'moment';
import numeral from 'numeral';
import * as React from 'react';
import {
	Animated,
	Easing,
	FlatList,
	LayoutChangeEvent,
	Text,
	View,
} from 'react-native';

import {
	dateFormatMomentJS,
	IMonthlyBarChartData,
	ISpentTillNow,
	IWeeklyBarChartData,
} from '../../environment/consts';
import { INavigationProps } from '../../types';
import styles, {
	defaultStyles,
	WEEK_CHART_ITEM_WIDTH,
} from './AdsStatisticsScreen.style';
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

class Screen extends React.Component<
	IAdsStatisticsScreenProps,
	IAdsStatisticsScreenState
> {
	public state = {
		selectedSpentButton: ISpentTillNow.weekly,
		translateX: new Animated.Value(0),
	};

	private slideWidth = 0;
	private maxWeeklyValue = 0;
	private maxMonthValue = 0;
	private scrollRef: FlatList<IWeeklyBarChartData> | undefined;

	public render() {
		const {
			transactions,
			totalAmountSOCX,
			weeklySeries,
			monthlySeries,
		} = this.props;
		const { selectedSpentButton, translateX } = this.state;
		const totalAmountSOCXFormatted = numeral(totalAmountSOCX).format('0.000a');
		transactions.map((transaction) => {
			transaction.date = moment(
				transaction.date,
				'MMMM DD, YYYY h:mm:ss',
			).format(dateFormatMomentJS.statisticsScreen);
		});

		this.maxWeeklyValue = this.getMaxSeriesValue(weeklySeries);
		this.maxMonthValue = this.getMaxSeriesValue(monthlySeries);

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
				scrollRef={this.scrollRef}
				weeklySeries={weeklySeries}
				renderBarChartWeeklyItem={this.renderBarChartWeeklyItem}
				getWeeklyChartItemLayout={this.getWeeklyChartItemLayout}
				monthlySeries={monthlySeries}
				renderBarChartMonthlyItem={this.renderBarChartMonthlyItem}
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

	private getWeeklyChartItemLayout = (data: any, index: number) => {
		return {
			length: WEEK_CHART_ITEM_WIDTH,
			offset: WEEK_CHART_ITEM_WIDTH * index,
			index,
		};
	};

	private weeklyChartContainerOnLayout = (event: LayoutChangeEvent) => {
		this.slideWidth = event.nativeEvent.layout.width;
	};

	private getMaxSeriesValue = (
		series: IWeeklyBarChartData[] | IMonthlyBarChartData[],
	) => {
		let ret = 0;
		for (const weeklyData of series) {
			if (weeklyData.value > ret) {
				ret = weeklyData.value;
			}
		}
		return ret;
	};

	private renderBarChartWeeklyItem = (data: {
		item: IWeeklyBarChartData;
		index: number;
	}) => {
		const weekDate = moment(data.item.date).week();
		const weekDateSuffix = this.props.getText(
			'ad.statistics.chart.currentweek.text',
		);
		const barChartColumnStyles = [
			styles.barChartColumn,
			{
				backgroundColor:
					data.index % 2 === 0
						? defaultStyles.barChartColumnColor
						: defaultStyles.barChartColumnLightColor,
				height: Math.round((data.item.value * 100) / this.maxWeeklyValue) + '%',
			},
		];
		return (
			<View style={styles.weekChartItem}>
				<View style={styles.barChartColumnContainer}>
					<View style={barChartColumnStyles} />
				</View>
				<View style={styles.barChartLabelContainer}>
					<Text style={styles.barCharItemLabel}>{weekDate}</Text>
					<Text style={styles.barCharItemLabelLowerScript}>
						{weekDateSuffix}
					</Text>
				</View>
			</View>
		);
	};

	private renderBarChartMonthlyItem = (data: {
		item: IMonthlyBarChartData;
		index: number;
	}) => {
		const barChartColumnStyles = [
			styles.barChartColumn,
			{
				backgroundColor:
					data.index % 2 === 0
						? defaultStyles.barChartColumnColor
						: defaultStyles.barChartColumnLightColor,
				height: Math.round((data.item.value * 100) / this.maxMonthValue) + '%',
			},
		];
		return (
			<View style={styles.monthChartItem}>
				<View style={styles.barChartColumnContainer}>
					<View style={barChartColumnStyles} />
				</View>
				<Text style={styles.barCharItemLabel}>{data.item.monthShort}</Text>
			</View>
		);
	};
}

export const AdsStatisticsScreen = (navProps: INavigationProps) => (
	<WithAdsStatistics>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithAdsStatistics>
);
