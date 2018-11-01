import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import { AvatarImage, OptionsMenuButton } from '../../';
import { IPostOwner, ITranslatedProps } from '../../../types';
import { Location, TaggedFriends } from './';

import styles from './UserDetails.style';

interface IUserDetailsProps extends ITranslatedProps {
	canBack: boolean;
	user: IPostOwner;
	timestamp: Date;
	disableNavigation?: boolean;
	taggedFriends?: Array<{ fullName: string }>;
	location?: string;
	onUserPress: (userId: string) => void;
	onGoBack: () => void;
	onShowOptions: () => void;
}

export const UserDetails: React.SFC<IUserDetailsProps> = ({
	canBack,
	user,
	timestamp,
	disableNavigation,
	taggedFriends,
	location,
	onUserPress,
	onShowOptions,
	onGoBack,
	getText,
}) => {
	const date = moment(timestamp).format('MMM DD');
	const hour = moment(timestamp).format('hh:mm');

	return (
		<View style={styles.container}>
			{!!canBack && (
				<TouchableOpacity onPress={onGoBack} style={{ flex: 1 }}>
					<Icon name="ios-arrow-back" style={styles.arrow} />
				</TouchableOpacity>
			)}
			<TouchableOpacity
				onPress={() => onUserPress(user.userId)}
				disabled={disableNavigation}
				style={{ flex: 2 }}
			>
				<AvatarImage image={user.avatar} style={styles.avatar} />
			</TouchableOpacity>
			<View style={styles.details}>
				<Text style={styles.fullName} onPress={() => onUserPress(user.userId)}>
					{user.fullName}
					<TaggedFriends friends={taggedFriends || []} getText={getText} />
					<Location location={location} getText={getText} />
				</Text>
				<Text style={styles.timestamp}>{`${date} at ${hour}`}</Text>
			</View>
			<View style={styles.options}>
				<OptionsMenuButton dark={true} onPress={onShowOptions} />
			</View>
		</View>
	);
};
