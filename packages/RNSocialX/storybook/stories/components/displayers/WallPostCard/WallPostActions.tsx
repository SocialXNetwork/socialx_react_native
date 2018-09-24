import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {WallPostActions} from '../../../../../src/components/displayers/WallPostCard/';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('WallPostActions', () => (
		<WallPostActions
			likedByMe={false}
			numberOfSuperLikes={0}
			numberOfWalletCoins={15679}
			onLikePress={() => console.log('onLikePress')}
			onSuperLikePress={() => console.log('onSuperLikePress')}
			onCommentPress={() => console.log('onCommentsPress')}
			onWalletCoinsButtonPress={() => console.log('onWalletCoinsButtonPress')}
			getText={(text) => text}
		/>
	));
