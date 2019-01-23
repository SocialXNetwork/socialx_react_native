import * as React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary/WithNavigationHandlers';

import { INavigationProps } from '../../types';
import { MessagesScreenView } from './MessagesScreen.view';

const messages = ['jaakee', 'hackerman'];
const people = ['letsgheek', 'Philip', 'will2k'];

interface IProps extends INavigationProps {
	onOpenConversation: (alias: string) => void;
}

interface IState {
	messages: string[];
	people: string[];
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		messages,
		people,
	};

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return this.state.messages !== nextState.messages || this.state.people !== nextState.people;
	}

	public render() {
		return (
			<MessagesScreenView
				messages={this.state.messages}
				people={this.state.people}
				navigation={this.props.navigation}
				onRemoveMessage={this.onRemoveMessageHandler}
				onEntryPress={this.props.onOpenConversation}
			/>
		);
	}

	private onRemoveMessageHandler = (alias: string) => {
		this.setState((currentState) => ({
			messages: currentState.messages.filter((a) => a !== alias),
		}));
	};
}

export const MessagesScreen = (props: INavigationProps) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{({ actions }) => <Screen {...props} onOpenConversation={actions.onOpenConversation} />}
	</WithNavigationHandlers>
);
