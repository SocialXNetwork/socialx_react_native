import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Alert} from 'react-native';

import {CommentTextInput} from '../../../../src/components/';
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
				onCommentTextChange={(value) => this.setState({value})}
				onCommentSend={this.onSendHandler}
			/>
		);
	}

	private onSendHandler = () => {
		this.setState({value: ''});
		Alert.alert('Comment sent!');
	};
}

storiesOf('Components/inputs', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('CommentTextInput', () => <CommentTextInputStory />);
