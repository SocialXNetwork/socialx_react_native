import { debounce } from 'lodash';
import * as React from 'react';

import { INavigationProps } from '../../types';
import { MessagesScreenView } from './MessagesScreen.view';

const aliases = ['jaakee', 'hackerman', 'letsgheek', 'Philip', 'will2k'];
const DEBOUNCE_TIME = 300;

interface IProps extends INavigationProps {}

interface IState {
	term: string;
	aliases: string[];
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		term: '',
		aliases,
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
			<MessagesScreenView
				term={this.state.term}
				aliases={this.state.aliases}
				navigation={this.props.navigation}
				onChangeText={this.onChangeTextHandler}
				onRemoveMessage={this.onRemoveMessageHandler}
			/>
		);
	}

	private onChangeTextHandler = (term: string) => {
		this.setState({ term });
		this.search(term);

		if (term.length === 0) {
			this.setState({ aliases });
		}
	};

	private onRemoveMessageHandler = (alias: string) => {
		this.setState((currentState) => ({
			aliases: currentState.aliases.filter((a) => a !== alias),
		}));
	};
}

export const MessagesScreen = (props: INavigationProps) => <Screen {...props} />;
