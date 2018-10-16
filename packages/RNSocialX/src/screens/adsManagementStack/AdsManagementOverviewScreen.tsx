import * as React from 'react';

import {
	IWithAdsManagementOverviewEnhancedActions,
	IWithAdsManagementOverviewEnhancedData,
	WithAdsManagementOverview,
} from '../../enhancers/screens';
import { INavigationProps } from '../../types';
import { AdsManagementOverviewScreenView } from './AdsManagementOverviewScreen.view';

type IAdsManagementOverviewScreenProps = IWithAdsManagementOverviewEnhancedData &
	IWithAdsManagementOverviewEnhancedActions &
	INavigationProps;

class Screen extends React.Component<IAdsManagementOverviewScreenProps> {
	public render() {
		const {
			currentWeek,
			currentDate,
			lastSevenDays,
			adCards,
			spentValues,
			peopleReachedValues,
			impressionsValues,
			onSeePastPerformance,
			getText,
		} = this.props;
		return (
			<AdsManagementOverviewScreenView
				currentDate={currentDate}
				currentWeek={currentWeek}
				lastSevenDays={lastSevenDays}
				adCards={adCards}
				spentValues={spentValues}
				peopleReachedValues={peopleReachedValues}
				impressionsValues={impressionsValues}
				onEditAd={this.onEditAdHandler}
				onSeePastPerformance={onSeePastPerformance}
				onCreateAd={this.onCreateAdHandler}
				onClose={this.closeScreenHandler}
				getText={getText}
			/>
		);
	}

	private closeScreenHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onCreateAdHandler = () => {
		this.props.navigation.navigate('AdsManagementScreen');
	};

	private onEditAdHandler = () => {
		console.log('TODO: navigate to edit screen when implemented');
		// this.props.navigation.navigate('');
	};
}

export const AdsManagementOverviewScreen = (navProps: INavigationProps) => (
	<WithAdsManagementOverview>
		{({ data, actions }) => <Screen {...navProps} {...actions} {...data} />}
	</WithAdsManagementOverview>
);
