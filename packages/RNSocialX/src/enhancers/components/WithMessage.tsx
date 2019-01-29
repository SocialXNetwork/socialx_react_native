import * as React from 'react';

import { IDictionary, IOptionsMenuProps } from '../../types';

import { IDeleteMessageInput, IUpdateMessageInput } from '../../store/data/messages';
import { WithI18n } from '../connectors/app/WithI18n';
import { WithMessages } from '../connectors/data/WithMessages';
import { WithOverlays } from '../connectors/ui/WithOverlays';

export interface IWithMessageEnhancedData extends IDictionary {}

export interface IWithMessageEnhancedActions extends IOptionsMenuProps {
	deleteMessage: (input: IDeleteMessageInput) => void;
	updateMessage: (input: IUpdateMessageInput) => void;
}

interface IWithMessageEnhancedProps {
	data: IWithMessageEnhancedData;
	actions: IWithMessageEnhancedActions;
}

interface IWithMessageProps {
	children(props: IWithMessageEnhancedProps): JSX.Element;
}

interface IWithMessageState {}

export class WithMessage extends React.Component<IWithMessageProps, IWithMessageState> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithMessages>
								{({ deleteMessage, updateMessage }) =>
									this.props.children({
										data: {
											dictionary,
										},
										actions: {
											deleteMessage,
											updateMessage,
											showOptionsMenu,
										},
									})
								}
							</WithMessages>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
