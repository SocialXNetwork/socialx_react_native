import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IDictionary, IOptionsMenuProps, IProfile } from '../../../types';

import { IModalOverlay } from '../../../store/ui/overlays';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithOverlays } from '../../connectors/ui/WithOverlays';

export interface IWithConversationEnhancedData extends IDictionary {
	profile: IProfile;
	modal: IModalOverlay;
}

export interface IWithConversationEnhancedActions extends IOptionsMenuProps {}

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
									<WithProfiles>
										{({ profiles }) => {
											// const { alias } = navigationParams[SCREENS.Conversation];

											return this.props.children({
												data: {
													profile: profiles.jaakee,
													dictionary,
													modal,
												},
												actions: {
													showOptionsMenu,
												},
											});
										}}
									</WithProfiles>
								)}
							</WithNavigationParams>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
