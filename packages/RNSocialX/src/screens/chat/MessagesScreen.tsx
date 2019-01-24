import * as React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import { IWithMessagesEnhancedData, WithMessages } from '../../enhancers/screens';

import { INavigationProps } from '../../types';
import { MessagesScreenView } from './MessagesScreen.view';

const messages: string[] = [];
const people: string[] = ['letsgheek', 'Philip', 'will2k'];

interface IProps extends INavigationProps, IWithMessagesEnhancedData {
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
				dictionary={this.props.dictionary}
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
		{({ actions }) => (
			<WithMessages>
				{({ data }) => (
					<Screen {...props} {...data} onOpenConversation={actions.onOpenConversation} />
				)}
			</WithMessages>
		)}
	</WithNavigationHandlers>
);
