import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ITranslatedProps } from '../../../types';
import styles from './RecentLikes.style';

interface IRecentLikesProps extends ITranslatedProps {
	recentLikes: {
		name: string | null;
		total: number;
	};
	onUserPress: (userId: string) => void;
	onViewLikes: () => void;
}

export const RecentLikes: React.SFC<IRecentLikesProps> = ({
	recentLikes,
	onUserPress,
	onViewLikes,
	getText,
}) => {
	if (recentLikes.name) {
		const others =
			recentLikes.total - 1 === 1 ? getText('post.card.other') : getText('post.card.others');

		return (
			<View style={styles.container}>
				<View style={styles.wrapper}>
					<Text style={styles.normal}>{getText('post.card.liked.by') + ' '}</Text>
					<Text style={styles.bold} onPress={() => onUserPress(recentLikes.name!)}>
						{recentLikes.name}
					</Text>
				</View>
				{recentLikes.total > 1 && (
					<View style={styles.wrapper}>
						<Text style={styles.normal}>{' ' + getText('text.and') + ' '}</Text>
						<TouchableOpacity activeOpacity={1} onPress={onViewLikes}>
							<Text style={styles.bold}>{recentLikes.total - 1 + ' ' + others}</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}

	return null;
};
