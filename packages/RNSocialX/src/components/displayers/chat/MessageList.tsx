import React from 'react';
import { FlatList, Keyboard, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { IMessage } from '../../../store/data/messages';
import { IApplicationState, selectMessages } from '../../../store/selectors';

import { OS_TYPES } from '../../../environment/consts';
import { Message } from './Message';
import styles from './MessageList.style';

interface IMessageListProps {
	alias: string;
	avatar: string;
	onAvatarPress: () => void;
}

interface IProps extends IMessageListProps {
	messages: IMessage[];
}

interface IState {
	messageIndex: number;
	selected: boolean;
}

class Component extends React.Component<IProps, IState> {
	public state = {
		messageIndex: this.props.messages.length,
		selected: false,
	};

	private scrollRef: React.RefObject<FlatList<IMessage>> = React.createRef();

	public render() {
		const { messages, alias, avatar, onAvatarPress } = this.props;
		const { messageIndex, selected } = this.state;

		return (
			<FlatList
				ref={this.scrollRef}
				data={messages}
				renderItem={({ item, index }) => (
					<React.Fragment>
						{Platform.OS === OS_TYPES.IOS && (
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => {
									Keyboard.dismiss();

									if (selected) {
										this.onMessagePressHandler(messageIndex);
									}
								}}
							>
								<Message
									message={item}
									previousMessage={messages[index - 1] || null}
									nextMessage={messages[index + 1] || null}
									alias={alias}
									avatar={avatar}
									selected={messageIndex === index && selected}
									translateY={messageIndex <= index && selected}
									onAvatarPress={onAvatarPress}
									onMessagePress={() => this.onMessagePressHandler(index)}
								/>
							</TouchableOpacity>
						)}
						{Platform.OS === OS_TYPES.Android && (
							<Message
								message={item}
								previousMessage={messages[index - 1] || null}
								nextMessage={messages[index + 1] || null}
								alias={alias}
								avatar={avatar}
								selected={messageIndex === index && selected}
								translateY={messageIndex <= index && selected}
								onAvatarPress={onAvatarPress}
								onMessagePress={() => this.onMessagePressHandler(index)}
							/>
						)}
					</React.Fragment>
				)}
				keyboardShouldPersistTaps="handled"
				keyExtractor={(item) => item.id}
				onLayout={() => this.scrollRef.current && this.scrollRef.current.scrollToEnd()}
				onContentSizeChange={() => this.scrollRef.current && this.scrollRef.current.scrollToEnd()}
				contentContainerStyle={[styles.container, { paddingBottom: this.getContainerSpace() }]}
			/>
		);
	}

	private onMessagePressHandler = (index: number) => {
		const { selected, messageIndex } = this.state;

		if (index !== messageIndex && !selected) {
			this.setState({
				messageIndex: index,
				selected: true,
			});
		} else if (index !== messageIndex && selected) {
			this.setState({
				messageIndex: index,
			});
		} else if (index === messageIndex && !selected) {
			this.setState({ selected: true });
		} else {
			this.setState({ selected: false });
		}
	};

	private getContainerSpace = () => {
		if (this.state.messageIndex > 2 && this.state.selected && Platform.OS === OS_TYPES.IOS) {
			return 30;
		}

		return 0;
	};
}

const mapStateToProps = (state: IApplicationState, props: IMessageListProps) => ({
	messages: selectMessages(state.data.messages, props.alias),
});

export const MessageList = connect(mapStateToProps)(Component as any);
