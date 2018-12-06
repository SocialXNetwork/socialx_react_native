import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { MediaHorizontalScroller } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('MediaHorizontalScroller', () => (
		<MediaHorizontalScroller
			hashes={[
				'QmU4Eh4EXworX2zdQ7EAhd8qMUgXZa8XNcMNusNJ98d7Ug',
				'QmRYAtkw4iKBaUCP5fZgDSdN2WzAGG3pDyGwoFgsBh79tz',
				'QmXQAbsc1BbLkMFUeWLb63KMvfGEzJJRNWPktyWBKGrRsq',
			]}
			getText={getTextMock}
		/>
	));
