import {action} from '@storybook/addon-actions';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {MediaInfoModal} from '../../../../src/components';
import {MediaTypeImage} from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('MediaInfoModal', () => {
		const visible = boolean('visible', false);

		return (
			<MediaInfoModal
				visible={visible}
				mediaHash={'d89c92b4400b15c39e462a8caa939ab40c3aeeea:1234'}
				mediaSize={88152}
				mediaName={null}
				mediaType={MediaTypeImage}
				mediaURL={'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&h=350'}
				closeHandler={action('Close!')}
				getText={(text) => text}
			/>
		);
	});
