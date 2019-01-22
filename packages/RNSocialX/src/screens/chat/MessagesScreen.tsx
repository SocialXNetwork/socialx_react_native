import { debounce } from 'lodash';
import * as React from 'react';

import { INavigationProps } from '../../types';
import { MessagesScreenView } from './MessagesScreen.view';

const messages = ['jaakee', 'hackerman'];
const people = ['letsgheek', 'Philip', 'will2k'];
const DEBOUNCE_TIME = 300;

enum TABS {
	MESSAGES = 'messages',
	PEOPLE = 'people',
}

interface IProps extends INavigationProps {}

interface IState {
	activeTab: string;
	term: string;
	messages: string[];
	people: string[];
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		activeTab: TABS.MESSAGES,
		term: '',
		messages,
		people,
	};

	private search = debounce((term: string) => {
		const { activeTab } = this.state;

		if (activeTab === TABS.MESSAGES) {
			this.setState({
				messages: messages.filter((alias) => alias.toLowerCase().includes(term.toLowerCase())),
			});
		} else {
			this.setState({
				people: people.filter((alias) => alias.toLowerCase().includes(term.toLowerCase())),
			});
		}
	}, DEBOUNCE_TIME);

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return (
			this.state.term !== nextState.term ||
			this.state.messages !== nextState.messages ||
			this.state.people !== nextState.people
		);
	}

	public render() {
		return (
			<MessagesScreenView
				term={this.state.term}
				messages={this.state.messages}
				people={this.state.people}
				navigation={this.props.navigation}
				onChangeText={this.onChangeTextHandler}
				onChangeTab={this.onChangeTabHandler}
				onRemoveMessage={this.onRemoveMessageHandler}
			/>
		);
	}

	private onChangeTabHandler = () => {
		if (this.state.activeTab === TABS.MESSAGES) {
			this.setState({ activeTab: TABS.PEOPLE, term: '', messages });
		} else {
			this.setState({ activeTab: TABS.MESSAGES, term: '', people });
		}
	};

	private onChangeTextHandler = (term: string) => {
		this.setState({ term });
		this.search(term);

		if (term.length === 0) {
			if (this.state.activeTab === TABS.MESSAGES) {
				this.setState({ messages });
			} else {
				this.setState({ people });
			}
		}
	};

	private onRemoveMessageHandler = (alias: string) => {
		this.setState((currentState) => ({
			messages: currentState.messages.filter((a) => a !== alias),
		}));
	};
}

export const MessagesScreen = (props: INavigationProps) => <Screen {...props} />;
