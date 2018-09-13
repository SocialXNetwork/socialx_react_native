import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {View} from 'react-native';

import {HeaderLogo} from '../../../../src/components';
import {Colors} from '../../../../src/environment/theme';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/navigation', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('HeaderLogo', () => (
		<View
			style={{height: 75, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.pink}}
		>
			<HeaderLogo />
		</View>
	));
