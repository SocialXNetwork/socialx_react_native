import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { TaggedFriends } from '../../../../../src/components/displayers/WallPostCard';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('TaggedFriends no friends', () => (
		<TaggedFriends friends={[]} getText={(text) => text} />
	))
	.add('TaggedFriends, 1 friend', () => (
		<TaggedFriends
			friends={[{ fullName: 'Stanley Sater' }]}
			getText={(text) => text}
		/>
	))
	.add('TaggedFriends, 2+ friends', () => (
		<TaggedFriends
			friends={[{ fullName: 'Stanley Sater' }, { fullName: 'Yolonda Rodda' }]}
			getText={(text) => text}
		/>
	));
