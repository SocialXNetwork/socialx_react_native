import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {ActivityFriendRequestCard} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const image = 'https://www.w3schools.com/w3css/img_lights.jpg';

storiesOf('Components/activityCards', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('ActivityFriendRequestCard', () => (
		<ActivityFriendRequestCard
			avatarURL={image}
			fullName={'Alex Sirbu'}
			userName={'alexsirbu'}
			userId={'85-f3r1-5ad'}
			onRequestConfirmed={() => {
				/**/
			}}
			onRequestDeclined={() => {
				/**/
			}}
			onViewUserProfile={() => {
				/**/
			}}
			loadingConfirmed={false}
			loadingDeclined={false}
			getText={(text) => text}
		/>
	));
