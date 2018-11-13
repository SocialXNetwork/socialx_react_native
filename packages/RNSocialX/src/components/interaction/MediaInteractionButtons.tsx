import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { IMediaProps, ITranslatedProps } from '../../types';
import { LikeAnimatingButton } from './LikeAnimatingButton';

import styles from './MediaInteractionButtons.style';

interface IMediaInfoSectionProps extends ITranslatedProps {
	mediaObjects: IMediaProps[];
	activeSlide: number;
	canReact: boolean | undefined;
	likeDisabled: boolean;
	likedByCurrentUser: boolean;
	onCommentPress: () => void;
	onLikePress: () => void;
}

export const MediaInteractionButtons: React.SFC<IMediaInfoSectionProps> = ({
	mediaObjects,
	activeSlide,
	canReact = false,
	likeDisabled,
	likedByCurrentUser,
	onLikePress,
	onCommentPress,
	getText,
}) => {
	const currentMedia = mediaObjects[activeSlide];
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
							disabled={likeDisabled}
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
