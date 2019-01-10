import { debounce } from 'lodash';
import * as React from 'react';

import { INavigationProps } from '../../types';
import { FriendsListScreenView } from './FriendsListScreen.view';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import {
	IWithFriendsListEnhancedActions,
	IWithFriendsListEnhancedData,
	WithFriendsList,
} from '../../enhancers/screens';

const DEBOUNCE_TIME = 300;

interface IProps
	extends INavigationProps,
		IWithFriendsListEnhancedActions,
		IWithFriendsListEnhancedData,
		IWithNavigationHandlersEnhancedActions {
	aliases: string[];
}

interface IState {
	term: string;
	aliases: string[];
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		term: '',
		aliases: this.props.aliases,
	};

	private search = debounce(
		(term: string) =>
			this.setState((currentState) => ({
				aliases: currentState.aliases.filter((alias) =>
					alias.toLowerCase().includes(term.toLowerCase()),
				),
			})),
		DEBOUNCE_TIME,
	);

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return (
			this.props.aliases !== nextProps.aliases ||
			this.state.aliases !== nextState.aliases ||
			this.state.term !== nextState.term
		);
	}

	public render() {
		return (
			<FriendsListScreenView
				aliases={this.state.aliases}
				term={this.state.term}
				onChangeText={this.onChangeTextHandler}
				onGoBack={this.props.onGoBack}
				onViewUserProfile={this.props.onViewUserProfile}
				getText={this.props.getText}
			/>
		);
	}

	private onChangeTextHandler = (term: string) => {
		this.setState({ term });
		this.search(term);

		if (term.length === 0) {
			this.setState({ aliases: this.props.aliases });
		}
	};
}

export const FriendsListScreen = (props: IProps) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{(nav) => (
			<WithFriendsList>
				{(friends) => <Screen {...props} {...friends.data} {...friends.actions} {...nav.actions} />}
			</WithFriendsList>
		)}
	</WithNavigationHandlers>
);
