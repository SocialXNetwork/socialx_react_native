/**
 * TODO list:
 * 1. Props data: total amount of SOCX that user has, referrals, posts, bounties, dailyHistory data, monthlyHistory data
 */

import * as React from 'react';

import { IRewardsHistoryData } from '../../../environment/consts';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithRewardsEnhancedProps = {
	data: {
		totalAmountSOCX: 8239,
		referrals: '25%',
		posts: '30%',
		bounties: '45%',
		dailyHistory: [
			{
				date: '1st',
				amount: 39,
				currency: 'SOCX',
			},
			{
				date: '2nd',
				amount: 12,
				currency: 'SOCX',
			},
			{
				date: '3rd',
				amount: 43,
				currency: 'SOCX',
			},
			{
				date: '4th',
				amount: 17,
				currency: 'SOCX',
			},
			{
				date: '5th',
				amount: 39,
				currency: 'SOCX',
			},
			{
				date: '6th',
				amount: 67,
				currency: 'SOCX',
			},
			{
				date: '7th',
				amount: 50,
				currency: 'SOCX',
			},
			{
				date: '8th',
				amount: 32,
				currency: 'SOCX',
			},
			{
				date: '9th',
				amount: 10,
				currency: 'SOCX',
			},
			{
				date: '10th',
				amount: 27,
				currency: 'SOCX',
			},
			{
				date: '11st',
				amount: 78,
				currency: 'SOCX',
			},
			{
				date: '12nd',
				amount: 87,
				currency: 'SOCX',
			},
			{
				date: '13rd',
				amount: 39,
				currency: 'SOCX',
			},
			{
				date: '14th',
				amount: 12,
				currency: 'SOCX',
			},
			{
				date: '15th',
				amount: 43,
				currency: 'SOCX',
			},
			{
				date: '16th',
				amount: 17,
				currency: 'SOCX',
			},
			{
				date: '17th',
				amount: 39,
				currency: 'SOCX',
			},
			{
				date: '18th',
				amount: 67,
				currency: 'SOCX',
			},
			{
				date: '19th',
				amount: 50,
				currency: 'SOCX',
			},
			{
				date: '20th',
				amount: 32,
				currency: 'SOCX',
			},
			{
				date: '21st',
				amount: 10,
				currency: 'SOCX',
			},
			{
				date: '22nd',
				amount: 27,
				currency: 'SOCX',
			},
			{
				date: '23rd',
				amount: 78,
				currency: 'SOCX',
			},
			{
				date: '24th',
				amount: 87,
				currency: 'SOCX',
			},
			{
				date: '25th',
				amount: 67,
				currency: 'SOCX',
			},
			{
				date: '26th',
				amount: 50,
				currency: 'SOCX',
			},
			{
				date: '27th',
				amount: 32,
				currency: 'SOCX',
			},
			{
				date: '28th',
				amount: 10,
				currency: 'SOCX',
			},
			{
				date: '29th',
				amount: 27,
				currency: 'SOCX',
			},
			{
				date: '30th',
				amount: 78,
				currency: 'SOCX',
			},
			{
				date: '31st',
				amount: 87,
				currency: 'SOCX',
			},
		],
		monthlyHistory: [
			{
				date: 'Jan',
				amount: 39,
				currency: 'SOCX',
			},
			{
				date: 'Feb',
				amount: 12,
				currency: 'SOCX',
			},
			{
				date: 'March',
				amount: 43,
				currency: 'SOCX',
			},
			{
				date: 'April',
				amount: 17,
				currency: 'SOCX',
			},
			{
				date: 'May',
				amount: 39,
				currency: 'SOCX',
			},
			{
				date: 'June',
				amount: 67,
				currency: 'SOCX',
			},
			{
				date: 'July',
				amount: 50,
				currency: 'SOCX',
			},
			{
				date: 'Aug',
				amount: 32,
				currency: 'SOCX',
			},
			{
				date: 'Sep',
				amount: 10,
				currency: 'SOCX',
			},
			{
				date: 'Oct',
				amount: 27,
				currency: 'SOCX',
			},
			{
				date: 'Nov',
				amount: 78,
				currency: 'SOCX',
			},
			{
				date: 'Dec',
				amount: 87,
				currency: 'SOCX',
			},
		],
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithRewardsEnhancedData {
	totalAmountSOCX: number;
	referrals: string;
	posts: string;
	bounties: string;
	dailyHistory: IRewardsHistoryData[];
	monthlyHistory: IRewardsHistoryData[];
}

export interface IWithRewardsEnhancedActions extends ITranslatedProps {}

interface IWithRewardsEnhancedProps {
	data: IWithRewardsEnhancedData;
	actions: IWithRewardsEnhancedActions;
}

interface IWithRewardsProps {
	children(props: IWithRewardsEnhancedProps): JSX.Element;
}

interface IWithRewardsState {}

export class WithRewards extends React.Component<IWithRewardsProps, IWithRewardsState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) =>
					this.props.children({
						data: mock.data,
						actions: { ...mock.actions, getText },
					})
				}
			</WithI18n>
		);
	}
}
