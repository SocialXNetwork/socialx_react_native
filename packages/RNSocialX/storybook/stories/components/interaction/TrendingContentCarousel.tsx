import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {TrendingContentCarousel} from '../../../../src/components';
import {trendingContentItems} from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('TrendingContentCarousel', () => (
		<TrendingContentCarousel
			items={trendingContentItems}
			passContentRef={action('passContentRef')}
			// @ts-ignore
			navigation={null}
		/>
	));
