import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { TrendingCategoriesCarousel } from '../../../../src/components';
import { trendingCategoriesItems } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('TrendingCategoriesCarousel', () => (
		<TrendingCategoriesCarousel
			items={trendingCategoriesItems}
			contentRef={null}
		/>
	));
