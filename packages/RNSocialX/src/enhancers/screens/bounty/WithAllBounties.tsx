import * as React from 'react';

import { IDictionary } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';

export interface IWithAllBountiesEnhancedData extends IDictionary {}

export interface IWithAllBountiesEnhancedActions {
	onClaimBounty: () => undefined;
}

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
							dictionary,
						},
						actions: {
							onClaimBounty: () => undefined,
						},
					})
				}
			</WithI18n>
		);
	}
}
