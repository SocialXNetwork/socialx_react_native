import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../';
import { Colors } from '../../environment/theme';
import { FRIEND_TYPES, IUserEntry } from '../../types';

import { IWithFriendsEnhancedData, WithFriends } from '../../enhancers/logic/WithFriends';

import styles from './UserEntry.style';

interface IUserEntryProps {
	entry: IUserEntry;
	onPress: (entry: IUserEntry) => void;
}

type IProps = IUserEntryProps & IWithFriendsEnhancedData;

const Component: React.SFC<IProps> = ({ entry, status, onPress }) => (
	<TouchableOpacity activeOpacity={1} onPress={() => onPress(entry)} style={styles.card}>
		<View style={styles.details}>
			<AvatarImage image={entry.avatar} style={styles.avatar} />
			<View style={styles.textContainer}>
				<Text style={styles.name}>{entry.fullName}</Text>
				{entry.location.length > 0 && <Text style={styles.text}>{entry.location}</Text>}
				{entry.location.length === 0 && <Text style={styles.userName}>@{entry.userName}</Text>}
			</View>
		</View>
		<View style={styles.button}>
			{status.relationship === FRIEND_TYPES.NOT_FRIEND ? (
				<PrimaryButton
					label={status.text}
					size={ButtonSizes.Small}
					disabled={status.disabled}
					loading={status.disabled}
					borderColor={Colors.pink}
					textColor={Colors.white}
					containerStyle={styles.primary}
					onPress={() => status.actionHandler(entry.userId)}
				/>
			) : (
				<PrimaryButton
					label={status.text}
					size={ButtonSizes.Small}
					disabled={status.disabled}
					loading={status.disabled}
					borderColor={Colors.pink}
					textColor={Colors.pink}
					containerStyle={styles.secondary}
					onPress={() => status.actionHandler(entry.userId)}
				/>
			)}
		</View>
	</TouchableOpacity>
);

export const UserEntry: React.SFC<IUserEntryProps> = (props) => (
	<WithFriends relationship={props.entry.relationship}>
		{({ data }) => <Component {...props} {...data} />}
	</WithFriends>
);
