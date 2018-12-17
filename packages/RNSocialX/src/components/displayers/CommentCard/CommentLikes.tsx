import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './CommentLikes.style';

interface ICommentLikesProps {
	numberOfLikes: number;
	altPosition: boolean;
	onViewLikes: () => void;
}

export const CommentLikes: React.SFC<ICommentLikesProps> = ({
	numberOfLikes,
	altPosition,
	onViewLikes,
}) => (
	<TouchableOpacity
		activeOpacity={1}
		onPress={onViewLikes}
		style={[styles.container, altPosition ? styles.altLikesPosition : styles.defaultLikesPosition]}
	>
		<View style={styles.iconContainer}>
			<Icon name="md-thumbs-up" style={styles.icon} />
		</View>
		<Text style={styles.numberOfLikes}>{numberOfLikes}</Text>
	</TouchableOpacity>
);
