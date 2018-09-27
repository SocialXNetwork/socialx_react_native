import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { WallPostActions } from '../../../../../src/components/displayers/WallPostCard/';
import { getTextMock } from '../../../../../src/mocks';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('WallPostActions', () => (
		<WallPostActions
			likedByMe={false}
			numberOfSuperLikes={0}
			numberOfWalletCoins={15679}
			onLikePress={action('onLikePress')}
			onSuperLikePress={action('onSuperLikePress')}
			onCommentPress={action('onCommentPress')}
			onWalletCoinsButtonPress={action('onWalletCoinsButtonPress')}
			getText={getTextMock}
		/>
	));
