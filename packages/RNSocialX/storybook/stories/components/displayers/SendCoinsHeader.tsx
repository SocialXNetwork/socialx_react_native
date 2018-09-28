import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SendCoinsHeader } from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('SendCoinsHeader', () => <SendCoinsHeader coins={56.68} />);
