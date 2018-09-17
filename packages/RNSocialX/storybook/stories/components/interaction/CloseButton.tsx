import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Alert} from 'react-native';

import {CloseButton} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('CloseButton', () => <CloseButton onClose={() => Alert.alert('Pressed!')} />);
