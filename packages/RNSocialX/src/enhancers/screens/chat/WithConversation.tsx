import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IDictionary, IOptionsMenuProps, IProfile } from '../../../types';

import { IMessage, ISendMessageInput, IUpdateMessageInput } from '../../../store/data/messages';
import { IModalOverlay } from '../../../store/ui/overlays';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithMessages } from '../../connectors/data/WithMessages';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithOverlays } from '../../connectors/ui/WithOverlays';

export interface IWithConversationEnhancedData extends IDictionary {
	profile: IProfile;
	messages: IMessage[];
	modal: IModalOverlay;
}

export interface IWithConversationEnhancedActions extends IOptionsMenuProps {
	sendMessage: (input: ISendMessageInput) => void;
	updateMessage: (input: IUpdateMessageInput) => void;
}

interface IWithConversationEnhancedProps {
	data: IWithConversationEnhancedData;
	actions: IWithConversationEnhancedActions;
}

interface IWithConversationProps {
	children(props: IWithConversationEnhancedProps): JSX.Element;
}

interface IWithConversationState {}

export class WithConversation extends React.Component<
	IWithConversationProps,
	IWithConversationState
> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithOverlays>
						{({ modal, showOptionsMenu }) => (
							<WithNavigationParams>
								{({ navigationParams }) => (
									<WithMessages>
										{({ messages, sendMessage, updateMessage }) => (
											<WithProfiles>
												{({ profiles }) => {
													const { alias } = navigationParams[SCREENS.Conversation];

													return this.props.children({
														data: {
															profile: profiles[alias],
															messages: messages[alias] || [],
															dictionary,
															modal,
														},
														actions: {
															sendMessage,
															updateMessage,
															showOptionsMenu,
														},
													});
												}}
											</WithProfiles>
										)}
									</WithMessages>
								)}
							</WithNavigationParams>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
