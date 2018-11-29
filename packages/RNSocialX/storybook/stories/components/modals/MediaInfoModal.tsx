import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { MediaInfoModal } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import { MediaTypeImage } from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('MediaInfoModal', () => {
		const visible = boolean('visible', true);

		return (
			<MediaInfoModal
				visible={visible}
				url="https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&h=350"
				hash="d89c92b4400b15c39e462a8caa939ab40c3aeeea:1234"
				size={88152}
				type={MediaTypeImage}
				onCloseHandler={action('Close!')}
				getText={getTextMock}
			/>
		);
	});
