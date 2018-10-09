import * as React from 'react';

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
	public render() {
		const { transactions } = this.props;

		return (
			<AdsStatisticsScreenView
				transactions={transactions}
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const AdsStatisticsScreen = (navProps: INavigationProps) => (
	<WithAdsStatistics>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithAdsStatistics>
);
