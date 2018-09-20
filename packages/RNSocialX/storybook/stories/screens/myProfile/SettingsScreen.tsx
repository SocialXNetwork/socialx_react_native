import {action} from '@storybook/addon-actions';
import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {SettingsScreenView} from '../../../../src/screens/myProfile/SettingsScreen.view';

storiesOf('Screens/myProfile', module)
	.addDecorator(withKnobs)
	.add('SettingsScreen', () => {
		const aboutMeText = text('aboutMeText', 'Lorem ipsum dolor sit amet.');
		const firstName = text('firstName', 'Alex');
		const lastName = text('lastName', 'Sirbu');
		const userName = text('userName', 'alexsirbu');
		const email = text('email', 'alex@test.com');
		const mining = boolean('mining', false);
		const isLoading = boolean('isLoading', false);

		const userAvatar =
			'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350';

		return (
			<SettingsScreenView
				onSaveChanges={action('onSaveChanges')}
				onLogout={action('onLogout')}
				onGoBack={action('onGoBack')}
				getText={(value) => value}
				aboutMeText={aboutMeText}
				firstName={firstName}
				lastName={lastName}
				userName={userName}
				email={email}
				miningEnabled={mining}
				isLoading={isLoading}
				avatarURL={userAvatar}
			/>
		);
	});
