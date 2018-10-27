import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AvatarImage, CommentsHeaderMenuButton } from '../';
import { IPostOwner, ITranslatedProps } from '../../types';
import styles from './CommentsPostOwner.style';

interface IPostOwnerProps extends ITranslatedProps {
	owner: IPostOwner;
	timestamp: Date;
	onBackPress: () => void;
	// @Alex fix typing
	optionsProps: any;
	showUserProfile: (userId: string) => void;
}

export const CommentsPostOwner: React.SFC<IPostOwnerProps> = ({
	owner,
	timestamp,
	onBackPress,
	optionsProps,
	getText,
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
				{/* TODO @Alex replace this with DotsMenuModal */}
				<CommentsHeaderMenuButton
					sortOption={optionsProps.sortOption}
					onValueChange={optionsProps.onSelectionChange}
					getText={getText}
				/>
			</View>
		</View>
	);
};
