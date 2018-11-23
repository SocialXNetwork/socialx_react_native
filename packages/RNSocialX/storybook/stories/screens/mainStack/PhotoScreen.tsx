import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { PhotoScreenView } from '../../../../src/screens/mainStack/PhotoScreen.view';

storiesOf('Screens/mainStack', module)
	.addDecorator(withKnobs)
	.add('PhotoScreen', () => {
		const avatar = 'https://www.w3schools.com/w3css/img_lights.jpg';
		const media = [
			'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&h=350',
			'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
			'https://media.istockphoto.com/photos/christmas-lights-defocused-background-bokeh-gold-blue-picture-id613518332?k=6&m=613518332&s=612x612&w=0&h=Own5MdgJXjNhFd0YUyED1UP3mQsHeNhfML9F-DQYdYw=',
		];
		const taggedFriends = [
			{
				id: '1',
				fullName: 'Lorem Ipsum',
				location: 'Nowhere',
				avatar: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
			},
			{
				id: '2',
				fullName: 'Lorem Ipsum',
				location: 'Nowhere',
				avatar: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
			},
			{
				id: '3',
				fullName: 'Lorem Ipsum',
				location: 'Nowhere',
				avatar: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
			},
		];
		const locationEnabled = boolean('locationEnabled', false);
		const tagFriends = boolean('tagFriends', false);
		const location = text('location', 'Timisoara');
		const caption = text('caption', 'Lorem ipsum dolor sit amet.');

		return (
			<PhotoScreenView
				avatar={avatar}
				media={media}
				caption={caption}
				taggedFriends={taggedFriends}
				locationEnabled={locationEnabled}
				tagFriends={tagFriends}
				location={location}
				onShowTagFriends={action('onShowTagFriends')}
				onLocationToggle={action('onLocationToggle')}
				onLocationTextUpdate={action('onLocationTextUpdate')}
				onTagFriendsToggle={action('onTagFriendsToggle')}
				onChangeText={action('onChangeText')}
				onAddMedia={action('onAddMedia')}
				onCreatePost={action('onCreatePost')}
				onClose={action('onClose')}
				getText={getTextMock}
			/>
		);
	});
