import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {AvatarName} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/avatar', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	// .add('AvatarName', () => <AvatarName fullName="Alex Sirbu" />);
	.add('AvatarName', () => (
		<AvatarName fullName={'Alex Sirbu'} userName={'alexsirbu'} fullNameColor={'purple'} userNameColor={'purple'} />
	));
