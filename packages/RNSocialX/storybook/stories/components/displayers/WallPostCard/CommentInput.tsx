import {number, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Animated} from 'react-native';

import {CommentInput} from '../../../../../src/components/displayers/WallPostCard';
import CenterView from '../../../../helpers/CenterView';

// TODO: @Alex: check here animationValues!
storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('CommentInput', () => {
		const avatarSize = number('avatarSize', 25);
		return (
			<CommentInput
				noInput={false}
				comment={''}
				disabled={false}
				avatarURL={'https://avatars2.githubusercontent.com/u/212'}
				animationValues={{
					width: new Animated.Value(avatarSize),
					height: new Animated.Value(avatarSize),
					border: new Animated.Value(2),
				}}
				onCommentInputPress={() => console.log('onCommentInputPress')}
				onCommentInputChange={(comment: string) => console.log('onCommentInputChange', comment)}
			/>
		);
	});
