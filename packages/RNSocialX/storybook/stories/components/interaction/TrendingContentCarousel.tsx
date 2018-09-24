import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {TrendingContentCarousel} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const items = [
	{
		name: 'For you',
		content: [
			[{type: 'Image'}, {type: 'Image'}, {type: 'Video'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			[{type: 'Video'}, {type: 'Image'}, {type: 'Image'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
		],
	},
	{
		name: 'Cars',
		content: [
			[{type: 'Image'}, {type: 'Image'}, {type: 'Video'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			[{type: 'Video'}, {type: 'Image'}, {type: 'Image'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
		],
	},
	{
		name: 'Food',
		content: [
			[{type: 'Image'}, {type: 'Image'}, {type: 'Video'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			[{type: 'Video'}, {type: 'Image'}, {type: 'Image'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
		],
	},
	{
		name: 'Music',
		content: [
			[{type: 'Image'}, {type: 'Image'}, {type: 'Video'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			[{type: 'Video'}, {type: 'Image'}, {type: 'Image'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
		],
	},
	{
		name: 'Fashion',
		content: [
			[{type: 'Image'}, {type: 'Image'}, {type: 'Video'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			[{type: 'Video'}, {type: 'Image'}, {type: 'Image'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
		],
	},
	{
		name: 'Whatever',
		content: [
			[{type: 'Image'}, {type: 'Image'}, {type: 'Video'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			[{type: 'Image'}, {type: 'Image'}, {type: 'Video'}],
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
			{type: 'Image'},
			{type: 'Image', middle: true},
			{type: 'Image'},
		],
	},
];

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('TrendingContentCarousel', () => (
		<TrendingContentCarousel items={items} passContentRef={action('passContentRef')} />
	));
