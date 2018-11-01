import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { Animated } from 'react-native';

import { CommentInput } from '../../../../../src/components/displayers/WallPost';
import { getTextMock } from '../../../../../src/mocks';
import CenterView from '../../../../helpers/CenterView';

class CommentInputStory extends React.Component {
	public state = {
		inputWidth: new Animated.Value(0),
		inputSend: new Animated.Value(0),
	};

	public render() {
		return (
			<CommentInput
				comment=""
				avatar={'https://avatars2.githubusercontent.com/u/212'}
				animationValues={{
					width: this.state.inputWidth,
					send: this.state.inputSend,
				}}
				onCommentInputPress={action('onCommentInputPress')}
				onCommentInputChange={action('onCommentInputChange')}
				onSubmitComment={action('onSubmitComment')}
				getText={getTextMock}
			/>
		);
	}
}

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('CommentInput', () => {
		return <CommentInputStory />;
	});
