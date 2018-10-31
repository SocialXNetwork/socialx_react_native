import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { CommentTextInput } from '../../../../src/components/';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

class CommentTextInputStory extends React.Component {
	public state = {
		value: '',
	};

	public render() {
		return (
			<CommentTextInput
				autoFocus={true}
				comment={this.state.value}
				onCommentInputChange={(value: string) => this.setState({ value })}
				onCommentSend={this.onSendHandler}
				getText={getTextMock}
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
