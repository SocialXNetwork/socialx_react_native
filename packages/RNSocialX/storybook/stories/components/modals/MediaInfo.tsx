import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { MediaInfo } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import { MediaTypeImage } from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('MediaInfo', () => {
		const visible = boolean('visible', true);

		return (
			<MediaInfo
				visible={visible}
				hash="d89c92b4400b15c39e462a8caa939ab40c3aeeea:1234"
				size={88152}
				type={MediaTypeImage}
				onCloseHandler={action('Close!')}
				getText={getTextMock}
			/>
		);
	});
