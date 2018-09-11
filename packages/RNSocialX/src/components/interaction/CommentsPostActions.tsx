/**
 * TODO list:
 * 1. @Alex & @Chris: Do we need a comment button in here? Would do the same as tapping on input at the bottom.
 */

import * as React from 'react';
import {View} from 'react-native';

import {IconButton, LikeAnimatingButton} from '../../components';
import {ITranslatedProps} from '../../types';
import styles from './CommentsPostActions.style';

interface IPostActionsProps extends ITranslatedProps {
	likedByMe: boolean;
	onLikePress: () => void;
}

export const CommentsPostActions: React.SFC<IPostActionsProps> = ({likedByMe, onLikePress, getText}) => (
	<View style={styles.container}>
		<LikeAnimatingButton onPress={onLikePress} likedByMe={likedByMe} getText={getText} />
		// @ts-ignore
		<IconButton
			iconSource={'comment-o'}
			iconType={'fa'}
			onPress={() => {
				/**/
			}}
			iconStyle={styles.icon}
		/>
	</View>
);
