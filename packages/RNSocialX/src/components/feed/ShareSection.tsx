import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { AvatarImage } from '../';

import styles from './ShareSection.style';

interface IShareSectionProps {
	avatar: string;
	message: string;
	onCreateWallPost: () => void;
}

export const ShareSection: React.SFC<IShareSectionProps> = ({
	avatar,
	message,
	onCreateWallPost,
}) => (
	<View style={styles.container}>
		<AvatarImage image={avatar} style={styles.avatar} />
		<TouchableWithoutFeedback onPress={onCreateWallPost}>
			<View style={styles.messageContainer}>
				<Text style={styles.message}>{message}</Text>
			</View>
		</TouchableWithoutFeedback>
	</View>
);
