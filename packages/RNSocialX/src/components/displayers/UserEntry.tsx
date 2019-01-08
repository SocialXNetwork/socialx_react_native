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
	alias: string;
	onPress: () => void;
}

interface IProps extends IUserEntryProps, IWithFriendsEnhancedData {
	profile: IProfile;
	currentUserAlias: string;
}

const Component: React.SFC<IProps> = ({ profile, currentUserAlias, relationship, onPress }) => {
	if (profile) {
		return (
			<TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.card}>
				<View style={styles.details}>
					<AvatarImage image={profile.avatar} style={styles.avatar} />
					<View style={styles.textContainer}>
						<Text style={styles.name}>{profile.fullName}</Text>
						<Text style={styles.alias}>@{profile.alias}</Text>
					</View>
				</View>
				{currentUserAlias !== profile.alias && (
					<View style={styles.button}>
						{profile.status === FRIEND_TYPES.NOT_FRIEND ? (
							<PrimaryButton
								label={relationship.action}
								loading={
									relationship.activity !== null && relationship.activity.payload === profile.alias
								}
								size={ButtonSizes.Small}
								borderColor={Colors.pink}
								textColor={Colors.white}
								containerStyle={styles.primary}
								onPress={() => relationship.onStatusAction(profile.alias)}
							/>
						) : (
							<PrimaryButton
								label={relationship.action}
								loading={
									relationship.activity !== null && relationship.activity.payload === profile.alias
								}
								size={ButtonSizes.Small}
								borderColor={Colors.pink}
								textColor={Colors.pink}
								containerStyle={styles.secondary}
								onPress={() => relationship.onStatusAction(profile.alias)}
							/>
						)}
					</View>
				)}
			</TouchableOpacity>
		);
	}

	return null;
};
const EnhancedComponent: React.SFC<IProps> = (props) => (
	<WithCurrentUser>
		{({ currentUser }) => (
			<WithFriends status={props.profile.status}>
				{({ data }) => <Component {...props} {...data} currentUserAlias={currentUser.alias} />}
			</WithFriends>
		)}
	</WithCurrentUser>
);

const mapStateToProps = (state: IApplicationState, props: IUserEntryProps) => ({
	profile: selectProfile(state.data.profiles, props.alias),
});

export const UserEntry = connect(mapStateToProps)(EnhancedComponent as any);
