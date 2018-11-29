import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { IMedia } from '../../types';
import { LikeAnimatingButton } from './LikeAnimatingButton';

import styles from './MediaInteractionButtons.style';

interface IMediaInfoSectionProps {
	media: IMedia[];
	activeSlide: number;
	canReact: boolean | undefined;
	likedByCurrentUser: boolean;
	onCommentPress: () => void;
	onLikePress: () => void;
}

export const MediaInteractionButtons: React.SFC<IMediaInfoSectionProps> = ({
	media,
	activeSlide,
	canReact = false,
	likedByCurrentUser,
	onLikePress,
	onCommentPress,
}) => {
	const currentMedia = media[activeSlide];
	const numberOfLikes = currentMedia.numberOfLikes || 0;
	const numberOfComments = currentMedia.numberOfComments || 0;
	const hasLikesOrComments = numberOfComments > 0 || numberOfLikes > 0;

	return (
		<React.Fragment>
			{canReact && (
				<View style={styles.actionButtons}>
					<View style={styles.likesContainer}>
						<LikeAnimatingButton
							likedByCurrentUser={likedByCurrentUser}
							secondary={true}
							onLikePost={onLikePress}
						/>
						{hasLikesOrComments && numberOfLikes > 0 && (
							<Text style={styles.infoText}>{numberOfLikes}</Text>
						)}
					</View>
					<TouchableOpacity style={styles.commentsContainer} onPress={onCommentPress}>
						<View style={styles.commentsIconContainer}>
							<Icon name="comment-o" style={styles.iconStyle} />
						</View>
						{hasLikesOrComments && numberOfComments > 0 && (
							<Text style={styles.infoText}>{numberOfComments}</Text>
						)}
					</TouchableOpacity>
				</View>
			)}
		</React.Fragment>
	);
};
