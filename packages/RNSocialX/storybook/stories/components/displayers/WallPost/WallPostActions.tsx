import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { WallPostActions } from '../../../../../src/components/displayers/WallPost';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('WallPostActions', () => (
		<WallPostActions
			creating={false}
			likedByCurrentUser={false}
			numberOfSuperLikes={0}
			numberOfWalletCoins={15679}
			onLikePost={action('onLikePost')}
			onSuperLikePress={action('onSuperLikePress')}
			onCommentPress={action('onCommentPress')}
			onWalletCoinsPress={action('onWalletCoinsButtonPress')}
		/>
	));
