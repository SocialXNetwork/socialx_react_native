import * as React from 'react';

import { FRIEND_TYPES } from '../../types';

import { WithI18n } from '../connectors/app/WithI18n';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithOverlays } from '../connectors/ui/WithOverlays';

export interface IWithFriendsEnhancedData {
	status: {
		text: string;
		actionHandler: (userId: string) => void;
	};
}

export interface IWithFriendsEnhancedActions {}

interface IWithFriendstEnhancedProps {
	data: IWithFriendsEnhancedData;
	actions: IWithFriendsEnhancedActions;
}

interface IWithFriendsProps {
	relationship: FRIEND_TYPES;
	children(props: IWithFriendstEnhancedProps): JSX.Element;
}

interface IWithFriendsState {}

export class WithFriends extends React.Component<IWithFriendsProps, IWithFriendsState> {
	public render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithProfiles>
								{({ addFriend, removeFriend }) =>
									this.props.children({
										data: {
											status: {
												text: this.getStatus(this.props.relationship, getText),
												actionHandler: (userId) =>
													this.getHandler(
														this.props.relationship,
														userId,
														addFriend,
														removeFriend as any,
														showOptionsMenu,
														getText,
													)(),
											},
										},
										actions: {},
									})
								}
							</WithProfiles>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}

	private getStatus = (relationship: FRIEND_TYPES, getText: (value: string) => string) => {
		let text;

		switch (relationship) {
			case FRIEND_TYPES.MUTUAL:
				text = getText('button.friends');
				break;
			case FRIEND_TYPES.PENDING:
				text = getText('button.undo');
				break;
			case FRIEND_TYPES.NOT_FRIEND:
				text = getText('button.add.friend');
				break;
			default:
				text = getText('button.add.friend');
				break;
		}

		return text;
	};

	private getHandler = (
		relationship: FRIEND_TYPES,
		userId: string,
		addFriend: (input: { username: string }) => void,
		removeFriend: (removeFriendInput: { username: string }) => void,
		showOptionsMenu: (items: any) => void,
		getText: (value: string) => string,
	) => {
		let actionHandler;
		console.log('handler', relationship);

		switch (relationship) {
			case FRIEND_TYPES.MUTUAL:
				actionHandler = () =>
					this.onShowFriendshipOptionsHandler(userId, removeFriend, showOptionsMenu, getText);
				break;
			case FRIEND_TYPES.PENDING:
				actionHandler = () => undefined; // TODO: Implement cancel request actionHandler
				break;
			case FRIEND_TYPES.NOT_FRIEND:
				actionHandler = () => addFriend({ username: userId });
				break;
			default:
				actionHandler = () => addFriend({ username: userId });
				break;
		}

		return actionHandler;
	};

	private onShowFriendshipOptionsHandler = (
		userId: string,
		removeFriend: (input: { username: string }) => void,
		showOptionsMenu: (items: any) => void,
		getText: (value: string) => string,
	) => {
		const menuItems = [
			{
				label: getText('friendship.menu.option.remove'),
				icon: 'md-remove-circle',
				actionHandler: () => removeFriend({ username: userId }),
			},
		];
		showOptionsMenu(menuItems);
	};
}
