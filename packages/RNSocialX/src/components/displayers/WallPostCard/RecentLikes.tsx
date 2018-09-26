import * as React from 'react';
import { Text, View } from 'react-native';

import { ITranslatedProps } from '../../../types';
import styles from './RecentLikes.style';

interface IRecentLikesProps extends ITranslatedProps {
	likes: undefined | any[]; // TODO: @Alex fix typing after backend is ready
	onUserPress: (userId: string) => void;
}

export const RecentLikes: React.SFC<IRecentLikesProps> = ({
	likes,
	onUserPress,
	getText,
}) => {
	if (likes && likes.length > 0) {
		const lastLikeUser = likes[likes.length - 1];
		const numberOfOtherLikes = likes.length - 1;
		const secondLastLike = likes.length >= 2 ? likes[likes.length - 2] : null;
		const andText = ` ${getText('text.and')} `;

		return (
			<View style={styles.recentLikesContainer}>
				<Text style={styles.likedText}>
					{getText('post.card.liked.by') + ' '}
					<Text
						style={styles.likeTextBold}
						onPress={() => onUserPress(lastLikeUser.userId)}
					>
						{lastLikeUser.userName}
					</Text>
				</Text>
				{numberOfOtherLikes === 1 && (
					<Text style={styles.likedText}>
						{andText}
						<Text
							style={styles.likeTextBold}
							onPress={() => onUserPress(secondLastLike.userId)}
						>
							{secondLastLike.userName}
						</Text>
					</Text>
				)}
				{numberOfOtherLikes > 1 && (
					<Text style={styles.likedText}>
						{andText}
						<Text style={styles.likeTextBold}>
							{numberOfOtherLikes + ' others'}
						</Text>
					</Text>
				)}
			</View>
		);
	}

	return null;
};
