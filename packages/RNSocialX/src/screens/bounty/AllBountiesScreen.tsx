import React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import { IWithAllBountiesEnhancedData, WithAllBounties } from '../../enhancers/screens';

import { IBounty } from '../../store/data/bounties';
import { INavigationProps } from '../../types';
import { AllBountiesScreenView } from './AllBountiesScreen.view';

interface IProps extends INavigationProps, IWithAllBountiesEnhancedData {
	bounties: IBounty[];
	onOpenBounty: (id: string) => void;
}

interface IState {}

class Screen extends React.Component<IProps, IState> {
	public state = {};

	public render() {
		return (
			<AllBountiesScreenView
				bounties={this.props.bounties}
				navigation={this.props.navigation}
				dictionary={this.props.dictionary}
				onClaimBounty={this.props.onOpenBounty}
			/>
		);
	}
}

export const AllBountiesScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{({ actions }) => (
			<WithAllBounties>
				{({ data }) => <Screen {...props} {...data} onOpenBounty={actions.onOpenBounty} />}
			</WithAllBounties>
		)}
	</WithNavigationHandlers>
);
