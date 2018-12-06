import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ITranslatedProps } from '../../../types';
import styles from './Likes.style';

interface ILikesProps extends ITranslatedProps {
	alias: string;
	total: number;
	onUserPress: (alias: string) => void;
	onViewLikes: () => void;
}

export const Likes: React.SFC<ILikesProps> = ({
	alias,
	total,
	onUserPress,
	onViewLikes,
	getText,
}) => {
	const others = total - 1 === 1 ? getText('post.card.other') : getText('post.card.others');

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.normal}>{getText('post.card.liked.by') + ' '}</Text>
				<Text style={styles.bold} onPress={() => onUserPress(alias)}>
					{alias}
				</Text>
			</View>
			{total > 1 && (
				<View style={styles.wrapper}>
					<Text style={styles.normal}>{' ' + getText('text.and') + ' '}</Text>
					<TouchableOpacity activeOpacity={1} onPress={onViewLikes}>
						<Text style={styles.bold}>{total - 1 + ' ' + others}</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};
