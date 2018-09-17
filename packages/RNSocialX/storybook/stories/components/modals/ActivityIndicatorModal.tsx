import {boolean, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {ActivityIndicatorModal} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('ActivityIndicatorModal', () => {
		const visible = boolean('visible', false);

		return (
			<ActivityIndicatorModal
				activityIndicatorTitle={'Uploading'}
				activityIndicatorMessage={'Please wait until the photo is uploaded'}
				showActivityIndicator={visible}
			/>
		);
	});
