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
		const { getText } = this.props;

		return (
			<AdsManagementEditAdScreenView
				onGoBack={this.onGoBackHandler}
				getText={getText}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const AdsManagementEditAdScreen = (navProps: INavigationProps) => (
	<WithAdsManagementEditAd>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithAdsManagementEditAd>
);
