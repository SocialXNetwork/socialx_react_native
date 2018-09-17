import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Text} from 'react-native';

import {TouchableWithDoublePress} from '../../../../src/components';
import {Colors} from '../../../../src/environment/theme';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('TouchableWithDoublePress', () => (
		<React.Fragment>
			<Text style={{margin: 15, fontSize: 20}}>Press once or twice</Text>
			<TouchableWithDoublePress
				disabled={false}
				onSinglePress={action('Pressed once!')}
				onDoublePress={action('Pressed twice!')}
				style={{width: '50%', height: 40, backgroundColor: Colors.pink, borderRadius: 5}}
			/>
		</React.Fragment>
	));
