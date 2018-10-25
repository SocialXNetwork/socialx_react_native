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

class Screen extends React.Component<IAdsManagementEditAdScreenProps> {
	public render() {
		const { getText, adData } = this.props;

		return (
			<AdsManagementEditAdScreenView
				onGoBack={this.onGoBackHandler}
				getText={getText}
				editAd={this.editAd}
				duplicateAd={this.duplicateAd}
				adData={adData}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private editAd = () => {
		console.log('TO DO navigate to NewAdSetupPostScreen with current Ad Data');
	};

	private duplicateAd = () => {
		console.log(
			'TO DO duplicate Ad and navigate to AdsManagementOverviewScreen',
		);
	};
}

export const AdsManagementEditAdScreen = (navProps: INavigationProps) => (
	<WithAdsManagementEditAd>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithAdsManagementEditAd>
);
