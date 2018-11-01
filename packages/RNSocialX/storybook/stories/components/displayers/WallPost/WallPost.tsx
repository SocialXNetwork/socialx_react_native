import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { WallPost } from '../../../../../src/components';
import { getTextMock, posts } from '../../../../../src/mocks';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('WallPost', () => (
		<WallPost
			post={posts[0]}
			commentInput={false}
			onAddComment={action('onAddComment')}
			// @ts-ignore
			navigation={null}
			getText={getTextMock}
		/>
	));
