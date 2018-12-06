import * as React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './CommentLikes.style';

interface ICommentLikesProps {
	numberOfLikes: number;
	commentLikesPosition: StyleProp<ViewStyle>;
	onViewLikes: () => void;
}

export const CommentLikes: React.SFC<ICommentLikesProps> = ({
	numberOfLikes,
	commentLikesPosition,
	onViewLikes,
}) => (
	<TouchableOpacity
		activeOpacity={1}
		onPress={onViewLikes}
		style={[styles.container, commentLikesPosition]}
	>
		<View style={styles.iconContainer}>
			<Icon name="md-thumbs-up" style={styles.icon} />
		</View>
		<Text style={styles.numberOfLikes}>{numberOfLikes}</Text>
	</TouchableOpacity>
);
