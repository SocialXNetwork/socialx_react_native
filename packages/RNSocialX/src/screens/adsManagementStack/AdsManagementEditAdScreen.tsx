import * as React from 'react';

import { INavigationProps } from '../../types';
import { AdsManagementEditAdScreenView } from './AdsManagementEditAdScreen.view';

import {
	IWithAdsManagementEditAdEnhancedActions,
	IWithAdsManagementEditAdEnhancedData,
	WithAdsManagementEditAd,
} from '../../enhancers/screens';

type IAdsManagementEditAdScreenProps = INavigationProps &
	IWithAdsManagementEditAdEnhancedActions &
	IWithAdsManagementEditAdEnhancedData;

interface IModifiedAdData {
	adName: string;
	adNumber: string;
	budgetDate: string;
	budgetAmount: string;
}

class Screen extends React.Component<IAdsManagementEditAdScreenProps> {
	public render() {
		const { getText, adData } = this.props;
		const modifiedAdData = this.getModifiedAdData();

		return (
			<AdsManagementEditAdScreenView
				onGoBack={this.onGoBackHandler}
				getText={getText}
				editAd={this.editAd}
				duplicateAd={this.duplicateAd}
				adData={adData}
				budgetDate={modifiedAdData.budgetDate}
				budgetAmount={modifiedAdData.budgetAmount}
				adName={modifiedAdData.adName}
				adNumber={modifiedAdData.adNumber}
				editAdDirectory={this.editAdDirectory}
				editBudget={this.editBudget}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private getModifiedAdData = () => {
		const { getText } = this.props;
		const { name, numberOfAds, startDate, endDate, amount, currency } = this.props.adData;

		const numberAds =
			numberOfAds === '1'
				? numberOfAds + ' ' + getText('ad.management.title.one')
				: numberOfAds + ' ' + getText('ad.management.title.multiple');

		return {
			adName: '· ' + name,
			adNumber: numberAds,
			budgetDate: startDate + ' - ' + endDate,
			budgetAmount: (amount + ' ' + currency).toUpperCase(),
		};
	};

	private editAdDirectory = () => {
		console.log('TO DO: redirect to NewAdSetupPostScreen');
	};

	private editBudget = () => {
		console.log('TO DO: redirect to NewAdConfigBudgetScreen');
	};

	private editAd = () => {
		console.log('TO DO: navigate to NewAdSetupPostScreen');
	};

	private duplicateAd = () => {
		console.log('TO DO: duplicate Ad and navigate to AdsManagementOverviewScreen');
	};
}

export const AdsManagementEditAdScreen = (navProps: INavigationProps) => (
	<WithAdsManagementEditAd>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithAdsManagementEditAd>
);
