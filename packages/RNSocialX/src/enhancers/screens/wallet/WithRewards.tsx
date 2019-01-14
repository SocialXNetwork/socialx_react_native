/**
 * TODO list:
 * 1. Props data: total amount of SOCX that user has, referrals, posts, bounties, dailyHistory data, monthlyHistory data
 */

import * as React from 'react';

import { IRewardsHistoryData } from '../../../environment/consts';
import { dailyHistory, monthlyHistory } from '../../../mocks';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithRewardsEnhancedProps = {
	data: {
		totalAmountSOCX: 8239,
		referrals: '25%',
		posts: '30%',
		bounties: '45%',
		dailyHistory,
		monthlyHistory,
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
