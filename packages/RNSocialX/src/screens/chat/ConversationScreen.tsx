import * as React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithConversationEnhancedActions,
	IWithConversationEnhancedData,
	WithConversation,
} from '../../enhancers/screens';

import { INavigationProps } from '../../types';
import { ConversationScreenView } from './ConversationScreen.view';

interface IProps
	extends INavigationProps,
		IWithConversationEnhancedData,
		IWithConversationEnhancedActions {
	onGoBack: () => void;
	onViewUserProfile: (alias: string) => void;
}

class Screen extends React.Component<IProps> {
	public render() {
		const { profile, onGoBack, dictionary } = this.props;

		return (
			<ConversationScreenView
				profile={profile}
				dictionary={dictionary}
				showProfileOptions={this.showProfileOptionsHandler}
				showAddOptions={this.showAddOptionsHandler}
				onGoBack={onGoBack}
			/>
		);
	}

	public showProfileOptionsHandler = () => {
		const { showOptionsMenu, dictionary, profile, onViewUserProfile } = this.props;

		const items = [
			{
				label: dictionary.components.modals.options.viewProfile,
				icon: 'ios-person',
				actionHandler: () => onViewUserProfile(profile.alias),
			},
		];

		showOptionsMenu(items);
	};

	public showAddOptionsHandler = () => {
		const { showOptionsMenu, dictionary } = this.props;

		const items = [
			{
				label: dictionary.components.modals.options.addMedia,
				icon: 'md-photos',
				actionHandler: () => undefined,
			},
		];

		showOptionsMenu(items);
	};
}

export const ConversationScreen = (props: INavigationProps) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{({ actions }) => (
			<WithConversation>
				{(conv) => (
					<Screen
						{...props}
						{...conv.data}
						{...conv.actions}
						onGoBack={actions.onGoBack}
						onViewUserProfile={actions.onViewUserProfile}
					/>
				)}
			</WithConversation>
		)}
	</WithNavigationHandlers>
);
