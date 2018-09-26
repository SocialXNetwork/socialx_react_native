import * as React from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';

import styles from './ShareSection.style';

interface IShareSectionProps {
	sharePlaceholder: string;
	avatarImage: number;
	onShowNewWallPostPress: () => void;
	opacity: number;
}

export const ShareSection: React.SFC<IShareSectionProps> = ({
	sharePlaceholder,
	avatarImage,
	onShowNewWallPostPress,
	opacity,
}) => (
	<Animated.View style={[styles.container, { opacity }]}>
		<Animated.Image
			source={avatarImage}
			resizeMode={'cover'}
			style={[styles.avatar, { opacity }]}
		/>
		<TouchableWithoutFeedback onPress={onShowNewWallPostPress}>
			<View style={styles.textContainer}>
				<Animated.Text style={[styles.placeholder, { opacity }]}>
					{sharePlaceholder}
				</Animated.Text>
			</View>
		</TouchableWithoutFeedback>
	</Animated.View>
);
