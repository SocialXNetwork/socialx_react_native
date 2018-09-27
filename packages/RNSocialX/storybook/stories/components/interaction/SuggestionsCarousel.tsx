import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { View } from 'react-native';

import { SuggestionsCarousel } from '../../../../src/components';
import { getTextMock, suggestedItems } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('SuggestionsCarousel', () => (
		<View style={{ height: 325 }}>
			<SuggestionsCarousel items={suggestedItems} getText={getTextMock} />
		</View>
	));
