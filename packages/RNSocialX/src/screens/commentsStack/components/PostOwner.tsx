import moment from 'moment';
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from '../../../components';
import {ITranslatedProps} from '../../../types';
import {HeaderRight} from './HeaderRight';
import styles from './PostOwner.style';

interface IPostOwnerProps extends ITranslatedProps {
	owner: any;
	timestamp: Date;
	onBackPress: () => void;
	optionsProps: any;
	showUserProfile: (userId: string) => void;
}

export const PostOwner: React.SFC<IPostOwnerProps> = ({
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
				<Icon name={'ios-arrow-down'} style={styles.arrow} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => showUserProfile(owner.userId)}>
				<AvatarImage image={{uri: owner.avatarURL}} style={styles.avatar} />
			</TouchableOpacity>
			<View style={styles.textContainer}>
				<Text style={styles.user}>{owner.fullName}</Text>
				<Text style={styles.timestamp}>{`${timeStampDate} at ${timeStampHour}`}</Text>
			</View>
			<View style={styles.dotsContainer}>
				<HeaderRight
					sortOption={optionsProps.sortOption}
					onValueChange={optionsProps.onSelectionChange}
					getText={getText}
				/>
			</View>
		</View>
	);
};
