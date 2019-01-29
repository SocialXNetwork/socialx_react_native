import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { View } from 'react-native';

import { Profile } from '../../../../src/components';
import { PROFILE_TAB_ICON_TYPES } from '../../../../src/environment/consts';
import Provider from '../../../helpers/Provider';

const image = 'QmZgsU2Syps515N6xYFcLoL6u9pyqcvzNdz5xUtZQM7oV9';

storiesOf('Components/displayers', module)
	.addDecorator((story) => <Provider>{story()}</Provider>)
	.add('Profile', () => (
		<View style={{ flex: 1 }}>
			// @ts-ignore
			<Profile
				alias="alexsirbu"
				avatar={image}
				fullName="Alex Sirbu"
				numberOfPhotos={58}
				numberOfLikes={2569}
				numberOfFriends={794}
				numberOfComments={5912}
				isCurrentUser={false}
				tabs={true}
				activeTab={PROFILE_TAB_ICON_TYPES.LIST}
				description="Hi, this is some text about me."
				onEditProfile={action('onRequestConfirmed')}
				onIconPress={action('onRequestConfirmed')}
				onProfilePhotoPress={action('onProfilePhotoPress')}
				onViewFriends={action('onViewFriends')}
			/>
		</View>
	));
