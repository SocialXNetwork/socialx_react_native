import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {CloseButton} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('CloseButton', () => <CloseButton onClose={action('Pressed!')} />);
