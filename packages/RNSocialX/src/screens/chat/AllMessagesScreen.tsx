import React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import { IWithAllMessagesEnhancedData, WithAllMessages } from '../../enhancers/screens';

import { INavigationProps } from '../../types';
import { AllMessagesScreenView } from './AllMessagesScreen.view';

const messages: string[] = ['jaakee', 'hackerman'];
const people: string[] = ['letsgheek', 'Philip', 'will2k'];

interface IProps extends INavigationProps, IWithAllMessagesEnhancedData {
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
			<AllMessagesScreenView
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

export const AllMessagesScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{({ actions }) => (
			<WithAllMessages>
				{({ data }) => (
					<Screen {...props} {...data} onOpenConversation={actions.onOpenConversation} />
				)}
			</WithAllMessages>
		)}
	</WithNavigationHandlers>
);
