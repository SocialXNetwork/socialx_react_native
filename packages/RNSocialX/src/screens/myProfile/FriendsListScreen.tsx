import { debounce } from 'lodash';
import * as React from 'react';

import { INavigationProps } from '../../types';
import { FriendsListScreenView } from './FriendsListScreen.view';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import { IWithFriendsListEnhancedData, WithFriendsList } from '../../enhancers/screens';

const DEBOUNCE_TIME = 300;

interface IProps
	extends INavigationProps,
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

	public render() {
		return (
			<FriendsListScreenView
				aliases={this.state.aliases}
				term={this.state.term}
				onChangeText={this.onChangeTextHandler}
				onGoBack={this.props.onGoBack}
				onViewUserProfile={this.props.onViewUserProfile}
				dictionary={this.props.dictionary}
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
			<WithFriendsList navigation={props.navigation}>
				{(friends) => <Screen {...props} {...friends.data} {...nav.actions} />}
			</WithFriendsList>
		)}
	</WithNavigationHandlers>
);
