import React from 'react';
import { View } from 'react-native';

import { IconButton, LikeAnimatingButton } from '../../';

import styles from './WallPostActions.style';

export interface IWallPostActions {
	creating: boolean | undefined;
	likedByCurrentUser: boolean;
	numberOfSuperLikes: number;
	numberOfWalletCoins: number;
	onLikePost: () => void;
	onCommentPress: () => void;
	onSuperLikePress: () => void;
	onWalletCoinsPress: () => void;
}

export const WallPostActions: React.SFC<IWallPostActions> = ({
	creating,
	likedByCurrentUser,
	onLikePost,
	onCommentPress,
}) => {
	if (!creating) {
		return (
			<View style={styles.container}>
				<LikeAnimatingButton likedByCurrentUser={likedByCurrentUser} onLikePost={onLikePost} />
				<IconButton
					iconSource="comment-o"
					iconType="fa"
					onPress={onCommentPress}
					iconStyle={styles.icon}
				/>
			</View>
		);
	}

	return null;
};
