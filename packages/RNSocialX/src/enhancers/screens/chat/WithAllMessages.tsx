import * as React from 'react';

import { IDictionary } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';

export interface IWithAllMessagesEnhancedData extends IDictionary {}

export interface IWithAllMessagesEnhancedActions {}

interface IWithAllMessagesEnhancedProps {
	data: IWithAllMessagesEnhancedData;
	actions: IWithAllMessagesEnhancedActions;
}

interface IWithAllMessagesProps {
	children(props: IWithAllMessagesEnhancedProps): JSX.Element;
}

interface IWithAllMessagesState {}

export class WithAllMessages extends React.Component<IWithAllMessagesProps, IWithAllMessagesState> {
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
