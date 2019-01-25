import * as React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { IMessage } from '../../../store/data/messages';
import { IApplicationState, selectMessages } from '../../../store/selectors';

import { Message } from './Message';
import styles from './MessageList.style';

interface IMessageListProps {
	alias: string;
}

interface IProps extends IMessageListProps {
	messages: IMessage[];
}

class Component extends React.Component<IProps> {
	private scrollRef: React.RefObject<FlatList<IMessage>> = React.createRef();

	public render() {
		return (
			<FlatList
				ref={this.scrollRef}
				data={this.props.messages}
				renderItem={({ item }) => <Message message={item} />}
				keyboardShouldPersistTaps="handled"
				keyExtractor={(item) => item.id}
				onLayout={() => this.scrollRef.current && this.scrollRef.current.scrollToEnd()}
				onContentSizeChange={() => this.scrollRef.current && this.scrollRef.current.scrollToEnd()}
				contentContainerStyle={styles.container}
			/>
		);
	}
}

const mapStateToProps = (state: IApplicationState, props: IMessageListProps) => ({
	messages: selectMessages(state.data.messages, props.alias),
});

export const MessageList = connect(mapStateToProps)(Component as any);
