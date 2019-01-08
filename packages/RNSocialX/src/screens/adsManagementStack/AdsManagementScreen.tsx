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
		const { avatar, fullName, alias, getText } = this.props;

		return (
			<AdsManagementScreenView
				onGoBack={this.onGoBackHandler}
				avatar={avatar}
				fullName={fullName}
				alias={alias}
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
