import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { View } from 'react-native';

import { ProfileTopContainer } from '../../../../src/components';
import { PROFILE_TAB_ICON_TYPES } from '../../../../src/environment/consts';
import { getTextMock } from '../../../../src/mocks';
import { SearchResultKind } from '../../../../src/types';

const image = 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg';

storiesOf('Components/displayers', module).add('ProfileTopContainer', () => (
	<View style={{ flex: 1 }}>
		<ProfileTopContainer
			avatarURL={image}
			fullName="Alex Sirbu"
			userName="alexsirbu"
			numberOfPhotos={58}
			numberOfLikes={2569}
			numberOfFriends={794}
			numberOfComments={5912}
			relationship={SearchResultKind.NotFriend}
			isCurrentUser={false}
			tabs={true}
			activeTab={PROFILE_TAB_ICON_TYPES.LIST}
			aboutMeText="Hi, this is some text about me."
			onAddFriend={action('onRequestConfirmed')}
			onEditProfile={action('onRequestConfirmed')}
			onIconPress={action('onRequestConfirmed')}
			onShowFriendshipOptions={action('onRequestConfirmed')}
			onViewProfilePhoto={action('onRequestConfirmed')}
			getText={getTextMock}
		/>
	</View>
));
