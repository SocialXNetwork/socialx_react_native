import * as React from 'react';

import { IDictionary, IOptionsMenuProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';

export interface IWithBountyEnhancedData extends IDictionary {}

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
				{({ dictionary }) =>
					this.props.children({
						data: {
							dictionary,
						},
						actions: {},
					})
				}
			</WithI18n>
		);
	}
}
