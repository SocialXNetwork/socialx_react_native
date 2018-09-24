import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {MediaHorizontalScroller} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('MediaHorizontalScroller', () => (
		<MediaHorizontalScroller
			mediaURIs={[
				'https://www.w3schools.com/w3css/img_lights.jpg',
				'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&h=350',
				'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
				'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350',
				'https://media.istockphoto.com/photos/christmas-lights-defocused-background-bokeh-gold-blue-picture-id613518332?k=6&m=613518332&s=612x612&w=0&h=Own5MdgJXjNhFd0YUyED1UP3mQsHeNhfML9F-DQYdYw=',
				'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
			]}
			getText={(value) => value}
		/>
	));
