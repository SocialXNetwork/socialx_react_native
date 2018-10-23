import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles, { USER_AVATAR_PLACEHOLDER } from './ShareSection.style';

interface IShareSectionProps {
	sharePlaceholder: string;
	avatarImage: string;
	onCreateWallPost: () => void;
}

export const ShareSection: React.SFC<IShareSectionProps> = ({
	sharePlaceholder,
	avatarImage,
	onCreateWallPost,
}) => (
	<View style={styles.container}>
		<FastImage
			source={
				avatarImage.length > 0 ? { uri: avatarImage } : USER_AVATAR_PLACEHOLDER
			}
			resizeMode="cover"
			style={styles.avatar}
		/>
		<TouchableWithoutFeedback onPress={onCreateWallPost}>
			<View style={styles.textContainer}>
				<Text style={styles.placeholder}>{sharePlaceholder}</Text>
			</View>
		</TouchableWithoutFeedback>
	</View>
);
