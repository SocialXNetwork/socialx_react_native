import React from 'react';
import uuid from 'uuid/v4';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithConversationEnhancedActions,
	IWithConversationEnhancedData,
	WithConversation,
} from '../../enhancers/screens';

import { Icons } from '../../environment/theme';
import { INavigationProps, MESSAGE_TYPES } from '../../types';
import { ConversationScreenView } from './ConversationScreen.view';

interface IProps
	extends INavigationProps,
		IWithConversationEnhancedData,
		IWithConversationEnhancedActions {
	onViewUserProfile: (alias: string) => void;
	onGoBack: () => void;
}

interface IState {
	value: string;
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		value: '',
	};

	public render() {
		const { profile, dictionary, onGoBack } = this.props;

		return (
			<ConversationScreenView
				profile={profile}
				value={this.state.value}
				dictionary={dictionary}
				showProfileOptions={this.showProfileOptionsHandler}
				showAddOptions={this.showAddOptionsHandler}
				onChangeText={this.onChangeTextHandler}
				onSendMessage={this.onSendMessageHandler}
				onGoBack={onGoBack}
			/>
		);
	}

	private onChangeTextHandler = (value: string) => {
		this.setState({ value });
	};

	private onSendMessageHandler = () => {
		const {
			profile: { alias },
			messages,
			sendMessage,
			updateMessage,
		} = this.props;

		const content = this.state.value.trim();
		if (content.length > 0) {
			const message = {
				id: uuid(),
				type: MESSAGE_TYPES.TEXT,
				content,
				timestamp: Number(new Date(Date.now())),
				self: true,
				consecutive: {
					first: false,
					middle: false,
					last: false,
				},
			};

			sendMessage({ alias, message });
			this.setState({ value: '' });

			if (messages.length > 0) {
				const lastMessage = messages[messages.length - 1];
				if (lastMessage.self) {
					message.consecutive = {
						...message.consecutive,
						last: true,
					};

					if (lastMessage.consecutive.last) {
						updateMessage({
							id: lastMessage.id,
							alias,
							consecutive: { middle: true, last: false },
						});
					} else {
						updateMessage({ id: lastMessage.id, alias, consecutive: { first: true } });
					}
				}
			}
		}
	};

	private showProfileOptionsHandler = () => {
		const { showOptionsMenu, dictionary, profile, onViewUserProfile } = this.props;

		const items = [
			{
				label: dictionary.components.modals.options.viewProfile,
				icon: Icons.user,
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
				icon: Icons.gallery,
				actionHandler: () => undefined,
			},
		];

		showOptionsMenu(items);
	};
}

export const ConversationScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
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
