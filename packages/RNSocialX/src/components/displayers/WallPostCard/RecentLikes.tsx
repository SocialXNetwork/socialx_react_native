import * as React from 'react';
import { Text, View } from 'react-native';

import { ITranslatedProps } from '../../../types';
import styles from './RecentLikes.style';

interface IRecentLikesProps extends ITranslatedProps {
	recentLikes: {
		first: string | null;
		second: string | null;
		total: number;
	};
	onUserPress: (userId: string) => void;
}

export const RecentLikes: React.SFC<IRecentLikesProps> = ({
	recentLikes,
	onUserPress,
	getText,
}) => {
	if (recentLikes.first) {
		return (
			<View style={styles.recentLikesContainer}>
				<Text style={styles.likedText}>
					{getText('post.card.liked.by') + ' '}
					<Text style={styles.likeTextBold} onPress={() => onUserPress(recentLikes.first!)}>
						{recentLikes.first}
					</Text>
				</Text>
				{recentLikes.second && (
					<Text style={styles.likedText}>
						{' ' + getText('text.and') + ' '}
						<Text style={styles.likeTextBold} onPress={() => onUserPress(recentLikes.second!)}>
							{recentLikes.second}
						</Text>
					</Text>
				)}
				{recentLikes.total > 2 && (
					<Text style={styles.likedText}>
						{' ' + getText('text.and') + ' '}
						<Text style={styles.likeTextBold}>{recentLikes.total - 2 + ' others'}</Text>
					</Text>
				)}
			</View>
		);
	}

	return null;
};
