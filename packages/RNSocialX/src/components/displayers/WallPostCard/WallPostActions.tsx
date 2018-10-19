import React from 'react';
import { View } from 'react-native';

import { IconButton, LikeAnimatingButton } from '../../';
import { ITranslatedProps } from '../../../types';
// import {Icons} from '../../../environment/theme';

import styles from './WallPostActions.style';

export interface IWallPostActions extends ITranslatedProps {
	likedByMe: boolean;
	numberOfSuperLikes: number;
	numberOfWalletCoins: number;
	likeError: boolean;
	onLikePress: () => void;
	onSuperLikePress: () => void;
	onCommentPress: () => void;
	onWalletCoinsButtonPress: () => void;
}

export const WallPostActions: React.SFC<IWallPostActions> = ({
	likedByMe,
	likeError,
	onLikePress,
	onCommentPress,
	getText,
}) => {
	return (
		<View style={styles.container}>
			{/* TODO: add when implmented: Socx Wallet / Post Total Rewards
				 <IconButton
					iconSource={Icons.iconPostWalletCoins}
					onPress={onWalletCoinsButtonPress}
					label={numberOfWalletCoins + ' SOCX'}
				/> */}

			<LikeAnimatingButton
				onLikePress={onLikePress}
				likedByMe={likedByMe}
				likeError={likeError}
				getText={getText}
			/>
			{/* TODO: add when implemented: SuperLikes
					 <IconButton
						iconSource={Icons.iconPostSuperLike}
						onPress={onSuperLikePress}
						label={umberOfSuperLikes.toString()}
                    /> */}
			<IconButton
				iconSource="comment-o"
				iconType="fa"
				onPress={onCommentPress}
				iconStyle={styles.icon}
			/>
		</View>
	);
};
