import React from 'react';
import { View } from 'react-native';

import { IconButton, LikeAnimatingButton } from '../../';

import styles from './WallPostActions.style';

export interface IWallPostActions {
	likedByCurrentUser: boolean;
	numberOfSuperLikes: number;
	numberOfWalletCoins: number;
	onLikePost: () => void;
	onCommentPress: () => void;
	onSuperLikePress: () => void;
	onWalletCoinsPress: () => void;
}

export const WallPostActions: React.SFC<IWallPostActions> = ({
	likedByCurrentUser,
	onLikePost,
	onCommentPress,
}) => {
	return (
		<View style={styles.container}>
			{/* TODO: add when implmented: Socx Wallet / Post Total Rewards
				 <IconButton
					iconSource={Icons.iconPostWalletCoins}
					onPress={onWalletCoinsPress}
					label={numberOfWalletCoins + ' SOCX'}
				/> */}

			<LikeAnimatingButton likedByCurrentUser={likedByCurrentUser} onLikePost={onLikePost} />
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
