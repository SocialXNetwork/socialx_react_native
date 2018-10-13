import * as React from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';

import styles, { USER_AVATAR_PLACEHOLDER } from './ShareSection.style';

interface IShareSectionProps {
	sharePlaceholder: string;
	avatarImage: string | number | undefined;
	onCreateWallPost: () => void;
	opacity: number;
}

export const ShareSection: React.SFC<IShareSectionProps> = ({
	sharePlaceholder,
	avatarImage,
	onCreateWallPost,
	opacity,
}) => (
	<Animated.View style={[styles.container, { opacity }]}>
		<Animated.Image
			source={avatarImage ? { uri: avatarImage } : USER_AVATAR_PLACEHOLDER}
			resizeMode="cover"
			style={[styles.avatar, { opacity }]}
		/>
		<TouchableWithoutFeedback onPress={onCreateWallPost}>
			<View style={styles.textContainer}>
				<Animated.Text style={[styles.placeholder, { opacity }]}>
					{sharePlaceholder}
				</Animated.Text>
			</View>
		</TouchableWithoutFeedback>
	</Animated.View>
);
