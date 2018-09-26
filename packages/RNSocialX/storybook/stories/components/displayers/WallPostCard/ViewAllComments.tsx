import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { ViewAllComments } from '../../../../../src/components/displayers/WallPostCard';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('ViewAllComments', () => {
		const numberOfComments = number('numberOfComments', 5);
		return (
			<ViewAllComments
				numberOfComments={numberOfComments}
				onCommentPress={action('onCommentPress')}
				getText={(text) => text}
			/>
		);
	});
