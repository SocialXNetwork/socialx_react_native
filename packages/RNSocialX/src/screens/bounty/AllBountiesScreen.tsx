import React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import { IWithAllBountiesEnhancedData, WithAllBounties } from '../../enhancers/screens';

import { INavigationProps } from '../../types';
import { AllBountiesScreenView } from './AllBountiesScreen.view';

const bounties: string[] = ['Bounty 1', 'Bounty 2', 'Bounty 3', 'Bounty 4', 'Bounty 5'];

interface IProps extends INavigationProps, IWithAllBountiesEnhancedData {}

interface IState {
	bounties: string[];
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		bounties,
	};

	public render() {
		return (
			<AllBountiesScreenView
				navigation={this.props.navigation}
				dictionary={this.props.dictionary}
				bounties={this.state.bounties}
				onClaimBounty={this.onClaimBountyHandler}
			/>
		);
	}

	private onClaimBountyHandler = () => {
		return true;
	};
}

export const AllBountiesScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{({ actions }) => (
			<WithAllBounties>{({ data }) => <Screen {...props} {...data} />}</WithAllBounties>
		)}
	</WithNavigationHandlers>
);
