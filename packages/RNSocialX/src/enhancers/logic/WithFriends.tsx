import * as React from 'react';

import { ActionTypes } from '../../store/data/profiles/Types';
import { FRIEND_TYPES, IError } from '../../types';

import { WithI18n } from '../connectors/app/WithI18n';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithActivities } from '../connectors/ui/WithActivities';
import { WithOverlays } from '../connectors/ui/WithOverlays';

export interface IWithFriendsEnhancedData {
	status: {
		text: string;
		disabled: boolean;
		relationship: FRIEND_TYPES;
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

interface IWithFriendsState {
	text: string;
	relationship: FRIEND_TYPES;
	disabled: boolean;
	error: boolean;
}

export class WithFriends extends React.Component<IWithFriendsProps, IWithFriendsState> {
	public state = {
		text: '',
		relationship: this.props.relationship,
		disabled: false,
		error: false,
	};

	private errors: IError[] = [];

	private actions: {
		addFriend: (input: { username: string }) => void;
		removeFriend: (removeFriendInput: { username: string }) => void;
		showOptionsMenu: (optionsInput: { items: any }) => void;
		getText: (value: string, ...args: any[]) => string;
	} = {
		addFriend: () => undefined,
		removeFriend: () => undefined,
		showOptionsMenu: () => undefined,
		getText: () => '',
	};

	public componentDidMount() {
		const text = this.getStatusText(this.props.relationship);
		if (this.state.text !== text) {
			this.setState({ text });
		}
	}

	public componentDidUpdate() {
		const error = !!this.errors.find(
			(err) => err.type === ActionTypes.ADD_FRIEND || err.type === ActionTypes.REMOVE_FRIEND,
		);

		if (error && !this.state.error) {
			this.errors = [];
			this.setState({ error: true });
		}
	}

	public render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithActivities>
								{({ errors }) => (
									<WithProfiles>
										{({ addFriend, removeFriend }) => {
											this.errors = errors;
											this.actions = {
												addFriend,
												removeFriend: removeFriend as any,
												showOptionsMenu,
												getText,
											};

											return this.props.children({
												data: {
													status: {
														text: this.state.text,
														disabled: this.state.disabled,
														relationship: this.state.relationship,
														actionHandler: (userId) => {
															this.getHandler(this.props.relationship, userId)();
														},
													},
												},
												actions: {},
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

	private getStatusText = (relationship: FRIEND_TYPES) => {
		const { getText } = this.actions;
		let text: string;

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

	private getHandler = (relationship: FRIEND_TYPES, userId: string) => {
		let actionHandler: () => any;

		switch (relationship) {
			case FRIEND_TYPES.MUTUAL:
				actionHandler = () => this.onShowOptionsHandler(userId);
				break;
			case FRIEND_TYPES.PENDING:
				actionHandler = () => undefined; // TODO: Implement cancel request actionHandler
				break;
			case FRIEND_TYPES.NOT_FRIEND:
				actionHandler = () => this.onAddFriendHandler(userId);
				break;
			default:
				actionHandler = () => this.onAddFriendHandler(userId);
				break;
		}

		return actionHandler;
	};

	private onShowOptionsHandler = (userId: string) => {
		const { showOptionsMenu, getText } = this.actions;

		const items = [
			{
				label: getText('friendship.menu.option.remove'),
				icon: 'md-remove-circle',
				actionHandler: () => this.onRemoveFriendHandler(userId),
			},
		];

		showOptionsMenu({ items });
	};

	private getNextRelationship = (relationship: FRIEND_TYPES) => {
		let next: FRIEND_TYPES;

		switch (relationship) {
			case FRIEND_TYPES.NOT_FRIEND:
				next = FRIEND_TYPES.PENDING;
				break;
			case FRIEND_TYPES.PENDING:
				next = FRIEND_TYPES.MUTUAL;
				break;
			default:
				next = relationship;
				break;
		}

		return next;
	};

	private onAddFriendHandler = async (userId: string) => {
		const newRelationship = this.getNextRelationship(this.props.relationship);
		this.setState({
			text: this.getStatusText(newRelationship),
			relationship: newRelationship,
			disabled: true,
			error: false,
		});

		await this.actions.addFriend({ username: userId });

		if (this.state.error) {
			this.setState({
				text: this.getStatusText(this.props.relationship),
				relationship: this.props.relationship,
				disabled: false,
				error: false,
			});
		} else {
			this.setState({
				disabled: false,
			});
		}
	};

	private onRemoveFriendHandler = async (userId: string) => {
		const newRelationship = FRIEND_TYPES.NOT_FRIEND;
		this.setState({
			text: this.getStatusText(newRelationship),
			relationship: newRelationship,
			disabled: true,
			error: false,
		});

		await this.actions.removeFriend({ username: userId });

		if (this.state.error) {
			this.setState({
				text: this.getStatusText(this.props.relationship),
				relationship: this.props.relationship,
				disabled: false,
				error: false,
			});
		} else {
			this.setState({
				disabled: false,
			});
		}
	};
}
