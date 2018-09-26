import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { OfflineOverlayModal } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('OfflineOverlayModal', () => {
		const visible = boolean('visible', false);

		return <OfflineOverlayModal visible={visible} getText={(text) => text} />;
	});
