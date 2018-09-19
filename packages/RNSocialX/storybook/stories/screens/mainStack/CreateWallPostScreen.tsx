import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {CreateWallPostScreenView} from '../../../../src/screens/mainStack/CreateWallPostScreen.view';

storiesOf('Screens/mainStack', module).add('CreateWallPostScreen', () => {
	return (
		<CreateWallPostScreenView
			getText={(text) => text}
			marginBottom={0}
			avatarImage={'https://placeimg.com/200/200/people'}
			shareText={'Here new post content.\nWith two lines.'}
			mediaObjects={['https://placeimg.com/300/300/any', 'https://placeimg.com/301/301/any']}
			onShareTextUpdate={(...args: any[]) => console.log('onShareTextUpdate', args)}
			onAddMedia={(...args: any[]) => console.log('onAddMedia', args)}
			onPostSend={(...args: any[]) => console.log('onPostSend', args)}
			navigation={null}
		/>
	);
});
