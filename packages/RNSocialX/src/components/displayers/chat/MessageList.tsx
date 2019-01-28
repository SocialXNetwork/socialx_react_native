import * as React from 'react';
import { Animated, FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import { IMessage } from '../../../store/data/messages';
import { IApplicationState, selectMessages } from '../../../store/selectors';

import { Colors } from '../../../environment/theme';
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
		const { messages, avatar, onAvatarPress } = this.props;
		const { messageIndex, selected } = this.state;

		return (
			<React.Fragment>
				<FlatList
					ref={this.scrollRef}
					data={messages}
					renderItem={({ item, index }) => (
						<Message
							message={item}
							avatar={avatar}
							selected={messageIndex === index && selected}
							translateY={messageIndex <= index && selected}
							onAvatarPress={onAvatarPress}
							onMessagePress={() => this.onMessagePressHandler(index)}
						/>
					)}
					keyboardShouldPersistTaps="handled"
					keyExtractor={(item) => item.id}
					onLayout={() => this.scrollRef.current && this.scrollRef.current.scrollToEnd()}
					onContentSizeChange={() => this.scrollRef.current && this.scrollRef.current.scrollToEnd()}
					contentContainerStyle={[styles.container, { paddingBottom: this.getContainerSpace() }]}
				/>
			</React.Fragment>
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
		if (this.state.messageIndex > 2 && this.state.selected) {
			return 30;
		}

		return 0;
	};
}

const mapStateToProps = (state: IApplicationState, props: IMessageListProps) => ({
	messages: selectMessages(state.data.messages, props.alias),
});

export const MessageList = connect(mapStateToProps)(Component as any);
