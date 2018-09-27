import * as React from 'react';
import { Text, View } from 'react-native';

import { IMediaProps, ITranslatedProps } from '../../types';
import styles from './MediaInteractionButtons.style';

interface IMediaInfoSectionProps extends ITranslatedProps {
	mediaObjects: IMediaProps[];
	activeSlide: number;
}

export const MediaInteractionButtons: React.SFC<IMediaInfoSectionProps> = ({
	mediaObjects,
	activeSlide,
	getText,
}) => {
	const currentMedia = mediaObjects[activeSlide];
	const numberOfLikes = currentMedia.numberOfLikes || 0;
	const numberOfComments = currentMedia.numberOfComments || 0;

	if (numberOfComments > 0 || numberOfLikes > 0) {
		return (
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
		);
	}
	return null;
};
