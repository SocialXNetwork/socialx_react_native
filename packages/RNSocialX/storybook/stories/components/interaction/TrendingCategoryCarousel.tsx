import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {TrendingCategoriesCarousel} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const items = [
	{
		id: '1',
		name: 'For you',
	},
	{
		id: '2',
		name: 'Cars',
	},
	{
		id: '3',
		name: 'Food',
	},
	{
		id: '4',
		name: 'Music',
	},
	{
		id: '5',
		name: 'Fashion',
	},
	{
		id: '6',
		name: 'Whatever',
	},
];

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('TrendingCategoryCarousel', () => <TrendingCategoriesCarousel items={items} contentRef={null} />);
