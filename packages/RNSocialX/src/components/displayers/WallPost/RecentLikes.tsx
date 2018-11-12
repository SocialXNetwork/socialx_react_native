import * as React from 'react';
import { Text, View } from 'react-native';

import { ITranslatedProps } from '../../../types';
import styles from './RecentLikes.style';

interface IRecentLikesProps extends ITranslatedProps {
	recentLikes: {
		name: string | null;
		total: number;
	};
	onUserPress: (userId: string) => void;
}

export const RecentLikes: React.SFC<IRecentLikesProps> = ({
	recentLikes,
	onUserPress,
	getText,
}) => {
	if (recentLikes.name) {
		return (
			<View style={styles.recentLikesContainer}>
				<Text style={styles.likedText}>
					{getText('post.card.liked.by') + ' '}
					<Text style={styles.likeTextBold} onPress={() => onUserPress(recentLikes.name!)}>
						{recentLikes.name}
					</Text>
				</Text>
				{recentLikes.total > 1 && (
					<Text style={styles.likedText}>
						{' ' + getText('text.and') + ' '}
						<Text style={styles.likeTextBold}>{recentLikes.total - 1 + ' others'}</Text>
					</Text>
				)}
			</View>
		);
	}

	return null;
};
