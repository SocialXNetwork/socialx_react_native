import * as React from 'react';
import { View } from 'react-native';

import { INavigationProps } from '../../types';
import { AdsManagementScreenView } from './AdsManagementScreen.view';

import {
	IWithAdsManagementEnhancedActions,
	IWithAdsManagementEnhancedData,
	WithAdsManagement,
} from '../../enhancers/screens';

type IAdsManagementScreenProps = INavigationProps &
	IWithAdsManagementEnhancedActions &
	IWithAdsManagementEnhancedData;

class Screen extends React.Component<IAdsManagementScreenProps> {
	public render() {
		return <View />;
	}
}

export const AdsManagementConfigBudgetScreen = (navProps: INavigationProps) => {
	// <WithAdsManagement>
	// 		{({ data, actions })} => <Screen {...navProps} {...data} {...actions} />}
	// </WithAdsManagement>
};
