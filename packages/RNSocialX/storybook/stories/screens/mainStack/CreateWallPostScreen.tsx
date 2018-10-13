import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { CreateWallPostScreenView } from '../../../../src/screens/mainStack/CreateWallPostScreen.view';

storiesOf('Screens/mainStack', module).add('CreateWallPostScreen', () => {
	return (
		<CreateWallPostScreenView
			getText={getTextMock}
			marginBottom={0}
			avatarImage={'https://placeimg.com/200/200/people'}
			shareText={'Here new post content.\nWith two lines.'}
			mediaObjects={[
				'https://placeimg.com/300/300/any',
				'https://placeimg.com/301/301/any',
			]}
			onShareTextUpdate={action('onShareTextUpdate')}
			onAddMedia={action('onAddMedia')}
			onCreatePost={action('onPostMedia')}
			onClose={action('onClose')}
		/>
	);
});
