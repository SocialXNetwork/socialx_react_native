/**
 * TODO list:
 * 1. Props data: currentDate, currentWeek, lastSevenDays, ads, spentValues, peopleReachedValues, impressionsValues,
 * 2. Props actions: onSeePastPerformance (TBD, this might be a nav. action!)
 */

import * as React from 'react';
import { IAd, IAdsAccountPerformanceValues, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const ads = [
	{
		url: 'https://placeimg.com/300/300/any',
		title: 'Lorem ipsum dolor 1',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipi. And some more text on first paragraph\n' +
			'Elit, sed do eiusmod tempor incididunt ut labore',
		id: '1',
	},
	{
		url: 'https://placeimg.com/301/301/any',
		title: 'Using SOCX within our Ecosystem',
		description: 'Lorem ipsum dolor sit amet, consectetur adipi.\n' + 'Second line text goes here',
		id: '2',
	},
	{
		url: 'https://placeimg.com/302/302/any',
		title: 'Lorem ipsum dolor 2',
		description: 'Our token will allow you to interact within your friends.',
		id: '3',
	},
];

const chartSampleValues = [
	{
		value: 12,
		date: new Date(2018, 3, 10),
	},
	{
		value: 13,
		date: new Date(2018, 3, 11),
	},
	{
		value: 11,
		date: new Date(2018, 3, 12),
	},
	{
		value: 16,
		date: new Date(2018, 3, 13),
	},
	{
		value: 9,
		date: new Date(2018, 3, 14),
	},
	{
		value: 3,
		date: new Date(2018, 3, 15),
	},
	{
		value: 17,
		date: new Date(2018, 3, 16),
	},
];

const mock: IWithAdsManagementOverviewEnhancedProps = {
	data: {
		currentDate: 'Mar 17, 2018',
		currentWeek: 'Mar 10, 2018 - Mar 16,2018',
		lastSevenDays: 'Mar 10, 2018 - Mar 16,2018',
		ads,
		spentValues: chartSampleValues,
		peopleReachedValues: chartSampleValues,
		impressionsValues: chartSampleValues,
	},
	actions: {
		onSeePastPerformance: () => {
			console.log('TODO: onSeePastPerformance');
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithAdsManagementOverviewEnhancedData {
	currentDate: string;
	currentWeek: string;
	lastSevenDays: string;
	ads: IAd[];
	spentValues: IAdsAccountPerformanceValues[];
	peopleReachedValues: IAdsAccountPerformanceValues[];
	impressionsValues: IAdsAccountPerformanceValues[];
}

export interface IWithAdsManagementOverviewEnhancedActions extends ITranslatedProps {
	onSeePastPerformance: () => void;
}

interface IWithAdsManagementOverviewEnhancedProps {
	data: IWithAdsManagementOverviewEnhancedData;
	actions: IWithAdsManagementOverviewEnhancedActions;
}

interface IWithAdsManagementOverviewProps {
	children(props: IWithAdsManagementOverviewEnhancedProps): JSX.Element;
}

interface IWithAdsManagementOverviewState {}

export class WithAdsManagementOverview extends React.Component<
	IWithAdsManagementOverviewProps,
	IWithAdsManagementOverviewState
> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) =>
					children({
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
