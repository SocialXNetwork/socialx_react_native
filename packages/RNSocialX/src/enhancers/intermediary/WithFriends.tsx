import * as React from 'react';

import { ActionTypes, IAliasInput } from '../../store/data/profiles/Types';
import { FRIEND_TYPES } from '../../types';

import { IActivity } from '../../store/ui/activities';
import { WithI18n } from '../connectors/app/WithI18n';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithActivities } from '../connectors/ui/WithActivities';
import { WithOverlays } from '../connectors/ui/WithOverlays';
import { getActivityForFriends } from '../helpers';

export interface IWithFriendsEnhancedData {
	relationship: {
		action: string;
		activity: IActivity | null;
		onStatusAction: (alias: string) => void;
	};
	request: {
		accepting: boolean;
		rejecting: boolean;
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
	request: {
		accepting: boolean;
		rejecting: boolean;
	};
}

export class WithFriends extends React.Component<IWithFriendsProps, IWithFriendsState> {
	public state = {
		request: {
			accepting: false,
			rejecting: false,
		},
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
							<WithActivities>
								{({ activities }) => (
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
														activity: this.getActivity(activities),
														onStatusAction: (alias) => this.getHandler(alias)(),
													},
													request: this.state.request,
												},
												actions: {
													onAcceptFriendRequest: this.onAcceptFriendRequestHandler,
													onDeclineFriendRequest: this.onDeclineFriendRequestHandler,
												},
											});
										}}
									</WithProfiles>
								)}
							</WithActivities>
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

	private getActivity = (activities: IActivity[]) => {
		let activity: IActivity | null = null;

		if (this.props.status) {
			switch (this.props.status) {
				case FRIEND_TYPES.MUTUAL:
					activity = getActivityForFriends(activities, ActionTypes.REMOVE_FRIEND);
					break;
				case FRIEND_TYPES.PENDING:
					activity = getActivityForFriends(activities, ActionTypes.UNDO_REQUEST);
					break;
				case FRIEND_TYPES.NOT_FRIEND:
					activity = getActivityForFriends(activities, ActionTypes.ADD_FRIEND);
					break;
				default:
					activity = null;
					break;
			}
		}

		return activity;
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
		await this.actions.addFriend({ username: alias });
	};

	private onRemoveFriendHandler = async (alias: string) => {
		await this.actions.removeFriend({ username: alias });
	};

	private onUndoRequestHandler = async (alias: string) => {
		await this.actions.undoRequest({ username: alias });
	};

	private onAcceptFriendRequestHandler = async (username: string) => {
		this.setState((currentState) => ({
			request: {
				...currentState.request,
				accepting: true,
			},
		}));
		await this.actions.acceptFriend({ username });
		this.setState((currentState) => ({
			request: {
				...currentState.request,
				accepting: false,
			},
		}));
	};

	private onDeclineFriendRequestHandler = async (username: string) => {
		this.setState((currentState) => ({
			request: {
				...currentState.request,
				rejecting: true,
			},
		}));
		await this.actions.rejectFriend({ username });
		this.setState((currentState) => ({
			request: {
				...currentState.request,
				rejecting: false,
			},
		}));
	};
}
