import React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import { IWithAllMessagesEnhancedData, WithAllMessages } from '../../enhancers/screens';

import { INavigationProps } from '../../types';
import { AllMessagesScreenView } from './AllMessagesScreen.view';

const messages: string[] = [
	'jaakee',
	'hackerman',
	'letsgheek',
	'Philip',
	'will2k',
	'hackerman',
	'jaakee',
	'letsgheek',
	'Philip',
	'will2k',
	'hackerman',
	'jaakee',
	'letsgheek',
	'Philip',
	'will2k',
];
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

	private scrollY = new Animated.Value(0);
	private oldPosition = 0;
	private down = true;
	private up = true;

	public render() {
		return (
			<AllMessagesScreenView
				messages={this.state.messages}
				people={this.state.people}
				scrollY={this.scrollY}
				navigation={this.props.navigation}
				dictionary={this.props.dictionary}
				expandHeader={this.expandHeader}
				onRemoveMessage={this.onRemoveMessageHandler}
				onEntryPress={this.props.onOpenConversation}
				onScroll={this.onScrollHandler}
			/>
		);
	}

	private onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const newPosition = event.nativeEvent.contentOffset.y;

		if (newPosition >= 0 && newPosition >= this.oldPosition && this.up) {
			this.collapseHeader();
		} else if (newPosition >= 0 && newPosition < this.oldPosition && this.down) {
			this.expandHeader();
		}

		this.oldPosition = newPosition;
	};

	private onRemoveMessageHandler = (alias: string) => {
		this.setState((currentState) => ({
			messages: currentState.messages.filter((a) => a !== alias),
		}));
	};

	private collapseHeader = () => {
		Animated.timing(this.scrollY, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start(() => {
			this.up = false;
			this.down = true;
		});
	};

	private expandHeader = () => {
		Animated.timing(this.scrollY, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start(() => {
			this.down = false;
			this.up = true;
		});
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
