import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { posts } from '../../../../src/mocks';
import { CommentsScreenView } from '../../../../src/screens/home/CommentsScreen.view';

storiesOf('Screens/commentsStack', module)
	.addDecorator(withKnobs)
	.add('CommentsScreen', () => {
		const keyboardRaised = boolean('keyboardRaised', false);

		return (
			<CommentsScreenView
				post={posts[0]}
				comments={[]}
				keyboardRaised={keyboardRaised}
				// @ts-ignore
				navigation={null}
			/>
		);
	});
