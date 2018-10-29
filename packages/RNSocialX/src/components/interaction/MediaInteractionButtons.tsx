import * as React from 'react';
import { Text, View } from 'react-native';

import { IMediaProps, ITranslatedProps } from '../../types';
import { IconButton } from './IconButton';
import styles from './MediaInteractionButtons.style';

interface IMediaInfoSectionProps extends ITranslatedProps {
	mediaObjects: IMediaProps[];
	activeSlide: number;
	onCommentPress: () => void;
	onLikePress: () => void;
	canReactOnPost: boolean;
}

export const MediaInteractionButtons: React.SFC<IMediaInfoSectionProps> = ({
	mediaObjects,
	activeSlide,
	getText,
	onCommentPress,
	onLikePress,
	canReactOnPost,
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
						<Text style={styles.infoText}>{`${getText(
							'media.viewer.screen.likes',
						)} ${numberOfLikes}`}</Text>
					)}
					<View style={{ flex: 1 }} />
					{numberOfComments > 0 && (
						<Text style={styles.infoText}>
							{`${getText('media.viewer.screen.comments')} ${numberOfComments}`}
						</Text>
					)}
				</View>
			)}
			{canReactOnPost && (
				<View style={styles.actionButtons}>
					<IconButton
						label={getText('media.viewer.screen.like.button')}
						onPress={onLikePress}
						iconType="io"
						iconSource="md-thumbs-up"
						iconStyle={styles.iconStyle}
						textStyle={styles.textStyle}
					/>
					<IconButton
						label={getText('media.viewer.screen.comment.button')}
						onPress={onCommentPress}
						iconType="io"
						iconSource="md-chatboxes"
						iconStyle={styles.iconStyle}
						textStyle={styles.textStyle}
					/>
				</View>
			)}
		</React.Fragment>
	);
};
