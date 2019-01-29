import moment from 'moment';
import React from 'react';

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

interface IState {
	input: string;
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		input: '',
	};

	public render() {
		const { profile, dictionary, onGoBack } = this.props;

		return (
			<ConversationScreenView
				profile={profile}
				input={this.state.input}
				dictionary={dictionary}
				showProfileOptions={this.showProfileOptionsHandler}
				showAddOptions={this.showAddOptionsHandler}
				onChangeText={this.onChangeTextHandler}
				onGoBack={onGoBack}
			/>
		);
	}

	private onChangeTextHandler = (input: string) => {
		this.setState({ input });
	};

	private showProfileOptionsHandler = () => {
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

	private showAddOptionsHandler = () => {
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
