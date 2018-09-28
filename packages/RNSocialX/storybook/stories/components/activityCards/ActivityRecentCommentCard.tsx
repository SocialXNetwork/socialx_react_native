import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { ActivityRecentCommentCard } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

const image = 'https://www.w3schools.com/w3css/img_lights.jpg';

storiesOf('Components/activityCards', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('ActivityRecentCommentCard', () => (
		<ActivityRecentCommentCard
			avatarURL={image}
			fullName="Alex Sirbu"
			timestamp={new Date(Date.now())}
			wallPosts={[]}
			onThumbPress={action('onThumbPress')}
			getText={getTextMock}
		/>
	));
