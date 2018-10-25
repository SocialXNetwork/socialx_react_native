/**
 * TODO list:
 * 1. Props data: latest 3 transactions, total amount of SOCX that user has, weeklyData and monthlyData regarding Spent till now section
 */

import moment from 'moment';
import * as React from 'react';

import {
	IMonthlyBarChartData,
	IWeeklyBarChartData,
} from '../../../environment/consts';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const getRandomWeeklyValuesForCurrentYear = () => {
	const ret: IWeeklyBarChartData[] = [];
	const indexDate = moment().startOf('year');
	const today = moment();
	while (indexDate < today) {
		const randomValue = Math.round(Math.random() * 100);
		ret.push({
			value: randomValue,
			label: `${indexDate.week()}`,
		});
		indexDate.add(1, 'weeks');
	}
	ret.sort();
	return ret;
};

const getRandomMonthlyValuesForLastTwelveMonths = () => {
	const ret: IMonthlyBarChartData[] = [];
	const indexDate = moment().add(-11, 'months');
	const today = moment();
	while (indexDate < today) {
		const randomValue = Math.round(Math.random() * 100);
		ret.push({
			value: randomValue,
			label: indexDate.format('MMM'),
		});
		indexDate.add(1, 'month');
	}
	ret.sort((left, right) =>
		moment.utc(left.label, 'MMM').diff(moment.utc(right.label, 'MMM')),
	);
	return ret;
};

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
		weeklySeries: getRandomWeeklyValuesForCurrentYear(),
		monthlySeries: getRandomMonthlyValuesForLastTwelveMonths(),
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithAdsStatisticsEnhancedData {
	transactions: Array<{
		number: number;
		date: Date | string;
	}>;
	totalAmountSOCX: number;
	weeklySeries: IWeeklyBarChartData[];
	monthlySeries: IMonthlyBarChartData[];
}

export interface IWithAdsStatisticsEnhancedActions extends ITranslatedProps {}

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
