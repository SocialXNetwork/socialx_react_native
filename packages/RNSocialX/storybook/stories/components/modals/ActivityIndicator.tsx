import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { ActivityIndicator } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('ActivityIndicator', () => {
		const visible = boolean('visible', true);

		return (
			<ActivityIndicator
				title="Uploading"
				message="Please wait until the photo is uploaded"
				visible={visible}
				getText={getTextMock}
			/>
		);
	});
