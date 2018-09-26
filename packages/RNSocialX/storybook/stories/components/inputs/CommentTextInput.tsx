import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { CommentTextInput } from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

class CommentTextInputStory extends React.Component {
	public state = {
		value: '',
	};

	public render() {
		return (
			<CommentTextInput
				placeholder={'Type something'}
				autoFocus={true}
				showSendButton={true}
				commentText={this.state.value}
				onCommentTextChange={(value) => this.setState({ value })}
				onCommentSend={this.onSendHandler}
			/>
		);
	}

	private onSendHandler = () => {
		this.setState({ value: '' });
		action('Comment sent!');
	};
}

storiesOf('Components/inputs', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('CommentTextInput', () => <CommentTextInputStory />);
