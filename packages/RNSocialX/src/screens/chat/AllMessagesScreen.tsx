import React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import { IWithAllMessagesEnhancedData, WithAllMessages } from '../../enhancers/screens';

import { OS_TYPES } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { AllMessagesScreenView } from './AllMessagesScreen.view';

const MAX_SAMPLES = 20;
const messages: string[] = [
	'jaakee',
	'hackerman',
	'jaakee',
	'hackerman',
	'jaakee',
	'hackerman',
	'jaakee',
	'hackerman',
	'jaakee',
	'hackerman',
	'jaakee',
	'hackerman',
	'jaakee',
	'hackerman',
	'jaakee',
	'hackerman',
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
	private samples: number[] = [];
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
				onRemoveMessage={this.onRemoveMessageHandler}
				onEntryPress={this.props.onOpenConversation}
				onScroll={this.onScrollHandler}
			/>
		);
	}

	private onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const newPosition = event.nativeEvent.contentOffset.y;

		if (newPosition === 0) {
			Animated.timing(this.scrollY, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start(() => {
				this.down = false;
			});
		}

		if (this.samples.length < MAX_SAMPLES) {
			this.samples.push(newPosition);
		} else {
			this.samples = [];
		}

		if (newPosition >= this.oldPosition) {
			this.down = true;
			this.oldPosition = newPosition;

			if (this.up && this.samples[0] < this.samples[MAX_SAMPLES - 1]) {
				Animated.timing(this.scrollY, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}).start(() => {
					this.up = false;
				});
			}
		} else if (newPosition <= this.oldPosition) {
			this.up = true;
			this.oldPosition = newPosition;

			if (this.down && this.samples[0] > this.samples[MAX_SAMPLES - 1]) {
				Animated.timing(this.scrollY, {
					toValue: 0,
					duration: 200,
					useNativeDriver: true,
				}).start(() => {
					this.down = false;
				});
			}
		}
	};

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
