import * as React from 'react';

import { IDictionary } from '../../../types';

import { SCREENS } from '../../../environment/consts';
import { IBounty } from '../../../store/data/bounties';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithAllBounties } from './WithAllBounties';

export interface IWithBountyEnhancedData extends IDictionary {
	bounty: IBounty;
}

export interface IWithBountyEnhancedActions {}

interface IWithBountyEnhancedProps {
	data: IWithBountyEnhancedData;
	actions: IWithBountyEnhancedActions;
}

interface IWithBountyProps {
	children(props: IWithBountyEnhancedProps): JSX.Element;
}

interface IWithBountyState {}

export class WithBounty extends React.Component<IWithBountyProps, IWithBountyState> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithNavigationParams>
						{({ navigationParams }) => (
							<WithAllBounties>
								{({ data }) => {
									const { id } = navigationParams[SCREENS.Bounty];

									return this.props.children({
										data: {
											bounty: data.bounties[id - 1],
											dictionary,
										},
										actions: {},
									});
								}}
							</WithAllBounties>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
