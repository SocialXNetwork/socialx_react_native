import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../';
import { Colors } from '../../environment/theme';
import { FRIEND_TYPES } from '../../types';

import {
	IWithFriendsEnhancedData,
	WithCurrentUser,
	WithFriends,
} from '../../enhancers/intermediary';
import { IProfile } from '../../store/data/profiles';
import { IApplicationState, selectProfile } from '../../store/selectors';

import styles from './UserEntry.style';

interface IUserEntryProps {
	id: string;
	currentUserId: string;
	profile: IProfile;
	onPress: (alias: string) => void;
}

type IProps = IUserEntryProps & IWithFriendsEnhancedData;

const Component: React.SFC<IProps> = ({ profile, status, currentUserId, onPress }) => (
	<TouchableOpacity activeOpacity={1} onPress={() => onPress(profile.alias)} style={styles.card}>
		<View style={styles.details}>
			<AvatarImage image={profile.avatar} style={styles.avatar} />
			<View style={styles.textContainer}>
				<Text style={styles.name}>{profile.fullName}</Text>
				<Text style={styles.userName}>@{profile.alias}</Text>
			</View>
		</View>
		{currentUserId !== profile.alias && (
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
						onPress={() => status.actionHandler(profile.alias)}
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
						onPress={() => status.actionHandler(profile.alias)}
					/>
				)}
			</View>
		)}
	</TouchableOpacity>
);

const EnhancedComponent: React.SFC<IUserEntryProps> = (props) => (
	<WithCurrentUser>
		{({ currentUser }) => (
			<WithFriends relationship={props.profile.status}>
				{({ data }) => <Component {...props} {...data} currentUserId={currentUser.userId} />}
			</WithFriends>
		)}
	</WithCurrentUser>
);

const mapStateToProps = (state: IApplicationState, props: IUserEntryProps) => ({
	profile: selectProfile(state, props),
});

export const UserEntry = connect(mapStateToProps)(EnhancedComponent as any) as any;
