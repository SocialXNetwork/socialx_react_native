import * as React from 'react';
import {Text, View} from 'react-native';

import {ITranslatedProps} from '../../../types';
import styles from './PostLikes.style';

interface IPostLikesProps extends ITranslatedProps {
	likes: Array<{
		userName: string;
		userId: string;
	}>;
	showUserProfile: (userId: string) => void;
}

export const PostLikes: React.SFC<IPostLikesProps> = ({likes, showUserProfile, getText}) => {
	if (likes.length > 0) {
		const lastLikeUser = likes[likes.length - 1];
		const secondLastLike = likes.length >= 2 ? likes[likes.length - 2] : null;
		const numberOfOtherLikes = likes.length > 2 ? likes.length - 2 : 0;
		const andText = ` ${getText('text.and')} `;

		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					{getText('post.card.liked.by') + ' '}
					<Text style={styles.bold} onPress={() => showUserProfile(lastLikeUser.userId)}>
						{lastLikeUser.userName}
					</Text>
				</Text>
				{secondLastLike && (
					<Text style={styles.text}>
						{andText}
						<Text style={styles.bold} onPress={() => showUserProfile(secondLastLike.userId)}>
							{secondLastLike.userName}
						</Text>
					</Text>
				)}
				{numberOfOtherLikes > 1 && (
					<Text style={styles.text}>
						{andText}
						<Text style={styles.bold}>{`${numberOfOtherLikes} ${getText('text.others')}`}</Text>
					</Text>
				)}
			</View>
		);
	}
	return null;
};
