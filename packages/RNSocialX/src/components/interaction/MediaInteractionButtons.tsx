import * as React from 'react';
import { Text, View } from 'react-native';

import { IMediaProps, ITranslatedProps } from '../../types';
import { IconButton } from './IconButton';
import { LikeAnimatingButton } from './LikeAnimatingButton';

import styles from './MediaInteractionButtons.style';

interface IMediaInfoSectionProps extends ITranslatedProps {
	mediaObjects: IMediaProps[];
	activeSlide: number;
	canReact: boolean | undefined;
	postId?: string;
	likeFailed: boolean;
	onCommentPress: () => void;
	onLikePress: (likedByCurrentUser: boolean, postId: string) => void;
}

export const MediaInteractionButtons: React.SFC<IMediaInfoSectionProps> = ({
	mediaObjects,
	activeSlide,
	canReact = false,
	postId,
	likeFailed,
	onCommentPress,
	onLikePress,
	getText,
}) => {
	const currentMedia = mediaObjects[activeSlide];
	const numberOfLikes = currentMedia.numberOfLikes || 0;
	const numberOfComments = currentMedia.numberOfComments || 0;
	const hasLikesOrComments = numberOfComments > 0 || numberOfLikes > 0;

	return (
		<React.Fragment>
			{hasLikesOrComments && (
				<View style={styles.mediaInfoSection}>
					{numberOfLikes > 0 && (
						<Text style={styles.infoText}>
							{getText('media.viewer.screen.likes')} {numberOfLikes}
						</Text>
					)}
					<View style={{ flex: 1 }} />
					{numberOfComments > 0 && (
						<Text style={styles.infoText}>
							{getText('media.viewer.screen.comments')} {numberOfComments}
						</Text>
					)}
				</View>
			)}
			{canReact && (
				<View style={styles.actionButtons}>
					<LikeAnimatingButton
						onLikePress={() => onLikePress(currentMedia.likedByCurrentUser, postId!)}
						likedByCurrentUser={currentMedia.likedByCurrentUser}
						likeFailed={likeFailed}
						secondary={true}
						getText={getText}
					/>
					<IconButton
						label={getText('media.viewer.screen.comment.button')}
						onPress={onCommentPress}
						iconSource="comment-o"
						iconType="fa"
						iconStyle={styles.iconStyle}
						textStyle={styles.textStyle}
					/>
				</View>
			)}
		</React.Fragment>
	);
};
