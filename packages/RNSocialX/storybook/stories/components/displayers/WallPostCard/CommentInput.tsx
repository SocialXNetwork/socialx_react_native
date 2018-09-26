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
		inputAvatarWidth: new Animated.Value(25),
		inputAvatarHeight: new Animated.Value(25),
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
				comment={''}
				disabled={false}
				avatarURL={'https://avatars2.githubusercontent.com/u/212'}
				animationValues={{
					width: this.state.inputAvatarWidth,
					height: this.state.inputAvatarHeight,
					border: this.state.inputBorderWidth,
				}}
				onCommentInputPress={this.onCommentInputPressHandler}
				onCommentInputChange={(comment: string) =>
					console.log('onCommentInputChange', comment)
				}
				onSubmitComment={() => console.log('onSubmitComment')}
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
				Animated.timing(this.state.inputAvatarWidth, {
					toValue: 25,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarHeight, {
					toValue: 25,
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
					duration: 350,
				}),
				Animated.timing(this.state.inputAvatarWidth, {
					toValue: 35,
					duration: 350,
				}),
				Animated.timing(this.state.inputAvatarHeight, {
					toValue: 35,
					duration: 350,
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
