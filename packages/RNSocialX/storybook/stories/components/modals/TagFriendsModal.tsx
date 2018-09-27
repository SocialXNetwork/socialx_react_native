import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { TagFriendsModal } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

const MOCK_SEARCH_RESULTS = [
	{
		id: '1',
		fullName: 'Alex Sirbu',
		location: 'Timisoara',
		avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		id: '2',
		fullName: 'Alex Sirbu',
		location: 'Timisoara',
		avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		id: '3',
		fullName: 'Alex Sirbu',
		location: 'Timisoara',
		avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		id: '4',
		fullName: 'Alex Sirbu',
		location: 'Timisoara',
		avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
];

const MOCK_SELECTED_USERS = [
	{
		id: '2',
		fullName: 'Alex Sirbu',
		location: 'Timisoara',
		avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		id: '3',
		fullName: 'Alex Sirbu',
		location: 'Timisoara',
		avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
];

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('TagFriendsModal', () => {
		const visible = boolean('visible', false);

		return (
			<TagFriendsModal
				visible={visible}
				doneHandler={action('Done')}
				cancelHandler={action('Cancel')}
				blurViewRef={null}
				searchResults={MOCK_SEARCH_RESULTS}
				selectedUsers={MOCK_SELECTED_USERS}
				onSearchUpdated={action('Search updated')}
				selectTagUserInModal={action('SelectTagUserInModal')}
				onDismiss={action('onDismiss')}
				onModalHide={action('onModalHide')}
				marginBottom={125}
				getText={getTextMock}
			/>
		);
	});
