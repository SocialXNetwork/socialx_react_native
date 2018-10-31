import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { UserDetails } from '../../../../../src/components/displayers/WallPost';
import { getTextMock } from '../../../../../src/mocks';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('UserDetails', () => {
		const timestamp = new Date('December 17, 2017 04:55:00');

		return (
			<UserDetails
				user={{
					userId: 'user_id_test',
					fullName: 'Michael Foucault',
					avatar: 'https://avatars2.githubusercontent.com/u/2531',
				}}
				timestamp={timestamp}
				taggedFriends={[]}
				location="Timisoara"
				onUserPress={action('onUserPress')}
				onShowOptions={action('onShowOptions')}
				getText={getTextMock}
			/>
		);
	});
