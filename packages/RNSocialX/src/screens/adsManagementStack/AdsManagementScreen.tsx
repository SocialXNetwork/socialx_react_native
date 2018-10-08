import * as React from 'react';

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
		const { avatarURL, fullName, userName, getText } = this.props;

		return (
			<AdsManagementScreenView
				onGoBack={this.onGoBackHandler}
				avatarURL={avatarURL}
				fullName={fullName}
				userName={userName}
				getText={getText}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const AdsManagementScreen = (navProps: INavigationProps) => (
	<WithAdsManagement>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithAdsManagement>
);
