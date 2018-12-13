import * as React from 'react';

import { IAliasInput } from '../../store/data/profiles/Types';
import { FRIEND_TYPES } from '../../types';

import { WithI18n } from '../connectors/app/WithI18n';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithOverlays } from '../connectors/ui/WithOverlays';

export interface IWithFriendsEnhancedData {
	relationship: {
		action: string;
		loading: boolean;
		onStatusAction: (alias: string) => void;
	};
}

export interface IWithFriendsEnhancedActions {
	onAcceptFriendRequest: (userName: string) => void;
	onDeclineFriendRequest: (userName: string) => void;
}

interface IWithFriendstEnhancedProps {
	data: IWithFriendsEnhancedData;
	actions: IWithFriendsEnhancedActions;
}

interface IWithFriendsProps {
	status?: FRIEND_TYPES;
	children(props: IWithFriendstEnhancedProps): JSX.Element;
}

interface IWithFriendsState {
	loading: boolean;
}

export class WithFriends extends React.Component<IWithFriendsProps, IWithFriendsState> {
	public state = {
		loading: false,
	};

	private actions: {
		addFriend: (input: IAliasInput) => void;
		removeFriend: (input: IAliasInput) => void;
		acceptFriend: (input: IAliasInput) => void;
		rejectFriend: (input: IAliasInput) => void;
		undoRequest: (input: IAliasInput) => void;
		showOptionsMenu: (optionsInput: { items: any }) => void;
		getText: (value: string, ...args: any[]) => string;
	} = {
		addFriend: () => undefined,
		removeFriend: () => undefined,
		acceptFriend: () => undefined,
		rejectFriend: () => undefined,
		undoRequest: () => undefined,
		showOptionsMenu: () => undefined,
		getText: () => '',
	};

	public render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithProfiles>
								{({ addFriend, removeFriend, acceptFriend, rejectFriend, undoRequest }) => {
									this.actions = {
										addFriend,
										removeFriend,
										acceptFriend,
										rejectFriend,
										undoRequest,
										showOptionsMenu,
										getText,
									};

									return this.props.children({
										data: {
											relationship: {
												action: this.getAction(),
												loading: this.state.loading,
												onStatusAction: (alias) => this.getHandler(alias)(),
											},
										},
										actions: {
											onAcceptFriendRequest: this.onAcceptFriendRequestHandler,
											onDeclineFriendRequest: this.onDeclineFriendRequestHandler,
										},
									});
								}}
							</WithProfiles>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}

	private getAction = () => {
		const { getText } = this.actions;
		let action: string = getText('button.add.friend');

		if (this.props.status) {
			switch (this.props.status) {
				case FRIEND_TYPES.MUTUAL:
					action = getText('button.friends');
					break;
				case FRIEND_TYPES.PENDING:
					action = getText('button.undo');
					break;
				case FRIEND_TYPES.NOT_FRIEND:
					action = getText('button.add.friend');
					break;
				default:
					action = getText('button.add.friend');
					break;
			}
		}

		return action;
	};

	private getHandler = (alias: string) => {
		let handler: () => void = () => this.onAddFriendHandler(alias);

		if (this.props.status) {
			switch (this.props.status) {
				case FRIEND_TYPES.MUTUAL:
					handler = () => this.onShowOptionsHandler(alias);
					break;
				case FRIEND_TYPES.PENDING:
					handler = () => this.onUndoRequestHandler(alias);
					break;
				case FRIEND_TYPES.NOT_FRIEND:
					handler = () => this.onAddFriendHandler(alias);
					break;
				default:
					handler = () => this.onAddFriendHandler(alias);
					break;
			}
		}

		return handler;
	};

	private onShowOptionsHandler = (alias: string) => {
		const { showOptionsMenu, getText } = this.actions;

		const items = [
			{
				label: getText('friendship.menu.option.remove'),
				icon: 'md-remove-circle',
				actionHandler: () => this.onRemoveFriendHandler(alias),
			},
		];

		showOptionsMenu({ items });
	};

	private onAddFriendHandler = async (alias: string) => {
		this.toggleLoading(true);
		await this.actions.addFriend({ username: alias });
		this.toggleLoading(false);
	};

	private onRemoveFriendHandler = async (alias: string) => {
		this.toggleLoading(true);
		await this.actions.removeFriend({ username: alias });
		this.toggleLoading(false);
	};

	private onUndoRequestHandler = async (alias: string) => {
		this.toggleLoading(true);
		await this.actions.undoRequest({ username: alias });
		this.toggleLoading(false);
	};

	private onAcceptFriendRequestHandler = async (username: string) => {
		this.toggleLoading(true);
		await this.actions.acceptFriend({ username });
		this.toggleLoading(false);
	};

	private onDeclineFriendRequestHandler = async (username: string) => {
		this.toggleLoading(true);
		await this.actions.rejectFriend({ username });
		this.toggleLoading(false);
	};

	private toggleLoading = (state: boolean) => {
		this.setState({ loading: state });
	};
}
