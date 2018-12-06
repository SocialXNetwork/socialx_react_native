import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { UserEntry } from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('UserEntry', () => <UserEntry id="entry1" onPress={action('onPress')} />);
