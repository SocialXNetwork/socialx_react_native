import * as React from 'react';

import { ActionTypes, IAliasInput } from '../../store/data/profiles/Types';
import { FRIEND_TYPES, IError, IGlobal } from '../../types';

import { WithI18n } from '../connectors/app/WithI18n';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithActivities } from '../connectors/ui/WithActivities';
import { WithGlobals } from '../connectors/ui/WithGlobals';
import { WithOverlays } from '../connectors/ui/WithOverlays';

export interface IWithFriendsEnhancedData {
	status: {
		text: string;
		disabled: boolean;
		relationship: FRIEND_TYPES | undefined;
		actionHandler: (alias: string) => void;
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
	relationship?: FRIEND_TYPES;
	children(props: IWithFriendstEnhancedProps): JSX.Element;
}

interface IWithFriendsState {
	text: string;
	relationship: FRIEND_TYPES | undefined;
	disabled: boolean;
	error: boolean;
}

export class WithFriends extends React.Component<IWithFriendsProps, IWithFriendsState> {
	public state = {
		text: '',
		relationship: this.props.relationship || undefined,
		disabled: false,
		error: false,
	};

	private errors: IError[] = [];

	private actions: {
		addFriend: (input: IAliasInput) => void;
		removeFriend: (input: IAliasInput) => void;
		acceptFriend: (input: IAliasInput) => void;
		rejectFriend: (input: IAliasInput) => void;
		undoRequest: (input: IAliasInput) => void;
		showOptionsMenu: (optionsInput: { items: any }) => void;
		setGlobal: (input: IGlobal) => void;
		getText: (value: string, ...args: any[]) => string;
	} = {
		addFriend: () => undefined,
		removeFriend: () => undefined,
		acceptFriend: () => undefined,
		rejectFriend: () => undefined,
		undoRequest: () => undefined,
		showOptionsMenu: () => undefined,
		setGlobal: () => undefined,
		getText: () => '',
	};

	public componentDidMount() {
		if (this.props.relationship) {
			const text = this.getStatusText(this.props.relationship);
			if (this.state.text !== text) {
				this.setState({ text });
			}
		}
	}

	public componentDidUpdate() {
		const error = !!this.errors.find(
			(err) =>
				err.type === ActionTypes.ADD_FRIEND ||
				err.type === ActionTypes.REMOVE_FRIEND ||
				err.type === ActionTypes.UNDO_REQUEST,
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
					<WithGlobals>
						{({ setGlobal }) => (
							<WithOverlays>
								{({ showOptionsMenu }) => (
									<WithActivities>
										{({ errors }) => (
											<WithProfiles>
												{({ addFriend, removeFriend, acceptFriend, rejectFriend, undoRequest }) => {
													this.errors = errors;
													this.actions = {
														addFriend,
														removeFriend,
														acceptFriend,
														rejectFriend,
														undoRequest,
														showOptionsMenu,
														setGlobal,
														getText,
													};

													return this.props.children({
														data: {
															status: {
																text: this.state.text,
																disabled: this.state.disabled,
																relationship: this.state.relationship
																	? this.state.relationship
																	: undefined,
																actionHandler: (alias) => this.getStatusHandler(alias)(),
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
									</WithActivities>
								)}
							</WithOverlays>
						)}
					</WithGlobals>
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

	private getStatusHandler = (alias: string) => {
		let actionHandler: () => any = () => undefined;

		if (this.props.relationship) {
			switch (this.props.relationship) {
				case FRIEND_TYPES.MUTUAL:
					actionHandler = () => this.onShowOptionsHandler(alias);
					break;
				case FRIEND_TYPES.PENDING:
					actionHandler = () => this.onUndoRequestHandler(alias);
					break;
				case FRIEND_TYPES.NOT_FRIEND:
					actionHandler = () => this.onAddFriendHandler(alias);
					break;
				default:
					actionHandler = () => this.onAddFriendHandler(alias);
					break;
			}
		}

		return actionHandler;
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

	private onAddFriendHandler = async (alias: string) => {
		if (this.props.relationship) {
			const newRelationship = this.getNextRelationship(this.props.relationship);
			this.setState({
				text: this.getStatusText(newRelationship),
				relationship: newRelationship,
				disabled: true,
				error: false,
			});

			await this.actions.addFriend({ username: alias });

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
		}
	};

	private onUndoRequestHandler = async (alias: string) => {
		if (this.props.relationship) {
			const newRelationship = FRIEND_TYPES.NOT_FRIEND;
			this.setState({
				text: this.getStatusText(newRelationship),
				relationship: newRelationship,
				disabled: true,
				error: false,
			});

			await this.actions.undoRequest({ username: alias });

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
		}
	};

	private onRemoveFriendHandler = async (alias: string) => {
		if (this.props.relationship) {
			const newRelationship = FRIEND_TYPES.NOT_FRIEND;
			this.setState({
				text: this.getStatusText(newRelationship),
				relationship: newRelationship,
				disabled: true,
				error: false,
			});

			await this.actions.removeFriend({ username: alias });

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
		}
	};

	private onAcceptFriendRequestHandler = async (username: string) => {
		this.toggleIndicator(true);
		await this.actions.acceptFriend({ username });
		this.toggleIndicator(false);
	};

	private onDeclineFriendRequestHandler = async (username: string) => {
		this.toggleIndicator(true);
		await this.actions.rejectFriend({ username });
		this.toggleIndicator(false);
	};

	private toggleIndicator = (state: boolean) => {
		this.actions.setGlobal({
			transparentOverlay: {
				visible: state,
				alpha: 0.6,
				loader: state,
			},
		});
	};
}
