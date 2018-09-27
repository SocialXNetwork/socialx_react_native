/**
 * TODO list:
 * 1. Props data: stats
 * 2. Props actions: getText
 */

import * as React from 'react';
import { CoinSymbol } from '../../../environment/consts';
import { ICryptoStats, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithSocialXAccountEnhancedProps = {
	data: {
		stats: {
			coins: 53680,
			contribution: 42205,
			returnPercentage: 27.21,
			digitalCoins: [
				{
					coinSymbol: CoinSymbol.SOCX,
					coinAmount: 799151.311,
					usdValue: 34621,
					trendPercentage: 4.5,
					graphData: [
						0.2,
						0.22,
						0.19,
						0.15,
						0.18,
						0.25,
						0.23,
						0.26,
						0.2,
						0.22,
						0.19,
						0.15,
						0.18,
						0.25,
						0.23,
						0.26,
					],
				},
				{
					coinSymbol: CoinSymbol.ETH,
					coinAmount: 10.578,
					usdValue: 1341415,
					trendPercentage: -2.6,
					graphData: [
						800,
						850,
						820,
						840,
						780,
						810,
						750,
						720,
						800,
						850,
						820,
						840,
						780,
						810,
						750,
						720,
					],
				},
			],
		},
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithSocialXAccountEnhancedData {
	stats: ICryptoStats;
}

export interface IWithSocialXAccountEnhancedActions extends ITranslatedProps {}

interface IWithSocialXAccountEnhancedProps {
	data: IWithSocialXAccountEnhancedData;
	actions: IWithSocialXAccountEnhancedActions;
}

interface IWithSocialXAccountProps {
	children(props: IWithSocialXAccountEnhancedProps): JSX.Element;
}

interface IWithSocialXAccountState {}

export class WithSocialXAccount extends React.Component<
	IWithSocialXAccountProps,
	IWithSocialXAccountState
> {
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
