import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import moment from 'moment';
import * as React from 'react';

import { UserDetails } from '../../../../../src/components/displayers/WallPostCard';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('UserDetails', () => {
		const timestamp = new Date('December 17, 2017 04:55:00');
		const timeStampDate = moment(timestamp).format('MMM DD');
		const timeStampHour = moment(timestamp).format('hh:mma');
		const hideAdvancedMenu = boolean('hideAdvancedMenu', false);
		const hideGoToUserProfile = boolean('hideGoToUserProfile', true);
		return (
			<UserDetails
				user={{
					userId: 'user_id_test',
					name: 'Michael Foucault',
					avatarURL: 'https://avatars2.githubusercontent.com/u/2531',
				}}
				getText={(text) => text}
				timeStampDate={timeStampDate}
				timeStampHour={timeStampHour}
				hideAdvancedMenu={hideAdvancedMenu}
				hideGoToUserProfile={hideGoToUserProfile}
				taggedFriends={[]}
				location={'Timisoara'}
				onUserPress={action('onUserPress')}
				onShowAdvancedMenu={action('onShowAdvancedMenu')}
			/>
		);
	});
