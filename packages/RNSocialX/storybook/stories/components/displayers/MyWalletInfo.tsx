import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { MyWalletInfo } from '../../../../src/components/';
import { getTextMock } from '../../../../src/mocks';
import { TrendOptions } from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('MyWalletInfo', () => (
		<MyWalletInfo
			coins="53,680"
			trendPercentage="27.21"
			trendArrow={TrendOptions.Up}
			onViewAccount={action('onViewAccount')}
			getText={getTextMock}
		/>
	));
