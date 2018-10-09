import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithAdsStatisticsEnhancedProps = {
	data: {
		transactions: [
			{
				number: 5,
				date: new Date('August 28, 2018 11:49:00'),
			},
			{
				number: 4,
				date: new Date('April 05, 2018 11:49:00'),
			},
			{
				number: 3,
				date: new Date('February 12, 2018 11:49:00'),
			},
		],
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithAdsStatisticsEnhancedData {
	transactions: Array<{
		number: number;
		date: Date;
	}>;
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
							getText: i18nProps.getText,
						},
					})
				}
			</WithI18n>
		);
	}
}
