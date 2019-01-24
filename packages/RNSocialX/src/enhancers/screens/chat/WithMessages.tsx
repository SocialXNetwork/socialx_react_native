import * as React from 'react';

import { IDictionary } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';

export interface IWithMessagesEnhancedData extends IDictionary {}

export interface IWithMessagesEnhancedActions {}

interface IWithMessagesEnhancedProps {
	data: IWithMessagesEnhancedData;
	actions: IWithMessagesEnhancedActions;
}

interface IWithMessagesProps {
	children(props: IWithMessagesEnhancedProps): JSX.Element;
}

interface IWithMessagesState {}

export class WithMessages extends React.Component<IWithMessagesProps, IWithMessagesState> {
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
