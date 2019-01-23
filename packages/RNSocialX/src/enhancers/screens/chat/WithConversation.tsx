import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IDictionary, IProfile } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithProfiles } from '../../connectors/data/WithProfiles';

export interface IWithConversationEnhancedData extends IDictionary {
	profile: IProfile;
}

export interface IWithConversationEnhancedActions {}

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
					<WithNavigationParams>
						{({ navigationParams }) => (
							<WithProfiles>
								{({ profiles }) => {
									const { alias } = navigationParams[SCREENS.Conversation];

									return this.props.children({
										data: {
											profile: profiles[alias],
											dictionary,
										},
										actions: {},
									});
								}}
							</WithProfiles>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
