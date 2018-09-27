// TODO: @Alex, check this component later, something's wrong with it

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { ActivityGenericCard } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

const image = 'https://www.w3schools.com/w3css/img_lights.jpg';

storiesOf('Components/activityCards', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('ActivityGenericCard', () => (
		<ActivityGenericCard
			onViewUserProfile={action('onViewUserProfile')}
			avatarURL={image}
			fullName={'Alex Sirbu'}
			userName={'alexsirbu'}
			userId={'85-f3r1-5ad'}
			requestId={'87-ga2d-1d'}
			text={'Hello, my name is Alex.'}
			onCheckNotification={action('onCheckNotification')}
			showConfirm={action('showConfirm')}
			hideConfirm={action('hideConfirm')}
			getText={getTextMock}
		/>
	));
