/**
 * TODO list:
 * 1. @Alex & @Chris: Do we need a comment button in here? Would do the same as tapping on input at the bottom.
 */

import * as React from 'react';
import { View } from 'react-native';

import { IconButton, LikeAnimatingButton } from '../../components';
import { ITranslatedProps } from '../../types';

import styles from './CommentsPostActions.style';

interface IPostActionsProps extends ITranslatedProps {
	likedByMe: boolean;
	likePostError: boolean;
	onLikePress: () => void;
	onStartComment: () => void;
}

export const CommentsPostActions: React.SFC<IPostActionsProps> = ({
	likedByMe,
	likePostError,
	onLikePress,
	onStartComment,
	getText,
}) => (
	<View style={styles.container}>
		<LikeAnimatingButton
			onLikePress={onLikePress}
			likeError={likePostError}
			likedByMe={likedByMe}
			getText={getText}
		/>
		<IconButton
			iconSource="comment-o"
			iconType="fa"
			onPress={onStartComment}
			iconStyle={styles.icon}
		/>
	</View>
);
