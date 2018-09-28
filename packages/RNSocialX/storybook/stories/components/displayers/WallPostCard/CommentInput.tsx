import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { Animated, Keyboard } from 'react-native';

import { CommentInput } from '../../../../../src/components/displayers/WallPostCard';
import CenterView from '../../../../helpers/CenterView';

class CommentInputStory extends React.Component {
	public state = {
		inputFocused: false,
		inputBorderWidth: new Animated.Value(0),
		inputAvatarSize: new Animated.Value(25),
		inputAvatarRadius: new Animated.Value(12.5),
	};

	private keyboardDidHideListener: any;

	public componentDidMount() {
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.keyboardDidHide,
		);
	}

	public componentWillUnmount() {
		this.keyboardDidHideListener.remove();
	}

	public render() {
		return (
			<CommentInput
				noInput={false}
				comment=""
				disabled={false}
				avatarURL={'https://avatars2.githubusercontent.com/u/212'}
				animationValues={{
					size: this.state.inputAvatarSize,
					radius: this.state.inputAvatarRadius,
					border: this.state.inputBorderWidth,
				}}
				onCommentInputPress={this.onCommentInputPressHandler}
				onCommentInputChange={action('onCommentInputChange')}
				onSubmitComment={action('onSubmitComment')}
			/>
		);
	}

	private keyboardDidHide = () => {
		if (this.state.inputFocused) {
			Animated.parallel([
				Animated.timing(this.state.inputBorderWidth, {
					toValue: 0,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarSize, {
					toValue: 25,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarRadius, {
					toValue: 12.5,
					duration: 250,
				}),
			]).start();
			this.setState({ inputFocused: false });
		}
	};

	private onCommentInputPressHandler = () => {
		if (!this.state.inputFocused) {
			Animated.parallel([
				Animated.timing(this.state.inputBorderWidth, {
					toValue: 2,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarSize, {
					toValue: 35,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarRadius, {
					toValue: 17.5,
					duration: 250,
				}),
			]).start();
			this.setState({ inputFocused: true });
		}
	};
}

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('CommentInput', () => {
		return <CommentInputStory />;
	});
