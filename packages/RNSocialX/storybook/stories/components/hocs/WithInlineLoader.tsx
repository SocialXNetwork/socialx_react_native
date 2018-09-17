import {boolean, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {WithInlineLoader} from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/hocs', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('WithInlineLoader', () => {
		const loading = boolean('loading', false);

		return <WithInlineLoader isLoading={loading} />;
	});
