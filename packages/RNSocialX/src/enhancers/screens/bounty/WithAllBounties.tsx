import * as React from 'react';

import { IDictionary } from '../../../types';

import { bounties } from '../../../mocks';
import { IBounty } from '../../../store/data/bounties';
import { WithI18n } from '../../connectors/app/WithI18n';

export interface IWithAllBountiesEnhancedData extends IDictionary {
	bounties: IBounty[];
}

export interface IWithAllBountiesEnhancedActions {}

interface IWithAllBountiesEnhancedProps {
	data: IWithAllBountiesEnhancedData;
	actions: IWithAllBountiesEnhancedActions;
}

interface IWithAllBountiesProps {
	children(props: IWithAllBountiesEnhancedProps): JSX.Element;
}

interface IWithAllBountiesState {}

export class WithAllBounties extends React.Component<IWithAllBountiesProps, IWithAllBountiesState> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) =>
					this.props.children({
						data: {
							bounties,
							dictionary,
						},
						actions: {},
					})
				}
			</WithI18n>
		);
	}
}
