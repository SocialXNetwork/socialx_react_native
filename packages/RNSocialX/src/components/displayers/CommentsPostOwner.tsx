import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AvatarImage, DotsMenuButton } from '../';
import { IPostOwner } from '../../types';
import styles, { defaultStyles } from './CommentsPostOwner.style';

interface IPostOwnerProps {
	owner: IPostOwner;
	timestamp: Date;
	onBackPress: () => void;
	showUserProfile: (userId: string) => void;
	onShowPostOptionsMenu: () => void;
}

export const CommentsPostOwner: React.SFC<IPostOwnerProps> = ({
	owner,
	timestamp,
	onBackPress,
	onShowPostOptionsMenu,
	showUserProfile,
}) => {
	const timeStampDate = moment(timestamp).format('MMM DD');
	const timeStampHour = moment(timestamp).format('hh:mma');
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onBackPress}>
				<Icon name="md-close" style={styles.arrow} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => showUserProfile(owner.userId)}>
				<AvatarImage image={owner.avatarURL} style={styles.avatar} />
			</TouchableOpacity>
			<View style={styles.textContainer}>
				<Text style={styles.user}>{owner.fullName}</Text>
				<Text style={styles.timestamp}>{`${timeStampDate} at ${timeStampHour}`}</Text>
			</View>
			<View style={styles.dotsContainer}>
				<DotsMenuButton
					iconColor={defaultStyles.advancedMenuButtonColor}
					onPress={onShowPostOptionsMenu}
				/>
			</View>
		</View>
	);
};
