import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { TopComments } from '../../../../../src/components/displayers/WallPost';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('TestComments', () => (
		<TopComments
			topComments={[
				{
					commentId: 'comm1',
					text: 'Sample comment no. 1',
					likes: [{ userId: 'user2', userName: 'userName2' }],
					owner: { userName: 'ionut_socx_0', userId: 'user1' },
				},
				{
					commentId: 'comm2',
					text: 'Some very long comment that should span on multiple lines',
					likes: [{ userId: 'user3', userName: 'userName3' }],
					owner: { userName: 'ionut_socx_2', userId: 'user4' },
				},
			]}
			onUserPress={action('onUserPress')}
			onCommentPress={action('onCommentPress')}
		/>
	));
