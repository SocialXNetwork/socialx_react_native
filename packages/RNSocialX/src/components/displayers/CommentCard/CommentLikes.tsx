import * as React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './CommentLikes.style';

interface ICommentLikesProps {
	numberOfLikes: number;
	commentLikesPosition: object;
}

export const CommentLikes: React.SFC<ICommentLikesProps> = ({numberOfLikes, commentLikesPosition}) => (
	<View style={[styles.likesContainer, commentLikesPosition]}>
		<View style={styles.likesBorder}>
			<View style={styles.iconContainer}>
				<Icon name={'md-thumbs-up'} style={styles.icon} />
			</View>
			<Text style={styles.numberOfLikes}>{numberOfLikes}</Text>
		</View>
	</View>
);
