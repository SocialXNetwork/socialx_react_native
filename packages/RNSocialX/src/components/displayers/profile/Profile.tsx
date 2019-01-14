/**
 * TODO list:
 * 1. handle onSendMessage prop
 * 2. implement onSendMessage handler
 */

import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AvatarImage, AvatarName, ButtonSizes, PrimaryButton } from '../../';
import { PROFILE_TAB_ICON_TYPES } from '../../../environment/consts';
import { FRIEND_TYPES, ITranslatedProps } from '../../../types';
import { Friends, Statistics, Tabs } from './';

import { IWithFriendsEnhancedData, WithFriends } from '../../../enhancers/intermediary';

import { Colors, Sizes } from '../../../environment/theme';
import styles from './Profile.style';
export const BUTTON_WIDTH = Sizes.smartHorizontalScale(150);

interface IProfileProps extends ITranslatedProps {
	alias: string;
	avatar: string;
	fullName: string;
	description: string;
	numberOfFriends: number;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfComments: number;
	status?: FRIEND_TYPES;
	isCurrentUser: boolean;
	tabs?: boolean;
	activeTab?: string;
	friends?: boolean;
	onAddFriend: () => void;
	onShowFriendshipOptions?: () => void;
	onProfilePhotoPress: () => void;
	onViewFriends: (alias: string) => void;
	onEditProfile?: () => void;
	onSendMessage?: () => void;
	onIconPress?: (tab: string) => void;
}

type IProps = IProfileProps & IWithFriendsEnhancedData;

const Component: React.SFC<IProps> = ({
	alias,
	avatar,
	fullName,
	description,
	numberOfFriends,
	numberOfPhotos,
	numberOfLikes,
	numberOfComments,
	isCurrentUser,
	activeTab = PROFILE_TAB_ICON_TYPES.LIST,
	tabs,
	status,
	relationship,
	friends,
	onProfilePhotoPress,
	onViewFriends,
	onEditProfile = () => undefined,
	onSendMessage = () => undefined,
	onIconPress = () => undefined,
	getText,
}) => (
	<View style={styles.container}>
		<View style={styles.avatarBackground}>
			<View style={styles.top} />
			<View style={styles.bottom} />
			<TouchableOpacity onPress={onProfilePhotoPress} style={styles.avatarContainer}>
				<AvatarImage image={avatar} style={styles.avatar} />
			</TouchableOpacity>
		</View>
		<View style={styles.statisticsContainer}>
			<View style={styles.leftStatistics}>
				<Statistics icon="image" value={numberOfPhotos} />
				<Statistics icon="heart" value={numberOfLikes} />
			</View>
			<View style={styles.rightStatistics}>
				<Statistics icon="users" value={numberOfFriends} />
				<Statistics icon="comments" value={numberOfComments} />
			</View>
		</View>
		<View style={styles.textContainer}>
			<AvatarName fullName={fullName} alias={alias} />
			{description.length > 0 && <Text style={styles.about}>{description}</Text>}
		</View>
		<View style={styles.buttons}>
			{!isCurrentUser &&
				(status === FRIEND_TYPES.NOT_FRIEND ? (
					<PrimaryButton
						width={BUTTON_WIDTH}
						label={relationship.action}
						loading={relationship.activity !== null && relationship.activity.payload === alias}
						size={ButtonSizes.Small}
						borderColor={Colors.pink}
						textColor={Colors.white}
						containerStyle={styles.primary}
						onPress={() => relationship.onStatusAction(alias)}
					/>
				) : (
					<PrimaryButton
						width={BUTTON_WIDTH}
						label={relationship.action}
						loading={relationship.activity !== null && relationship.activity.payload === alias}
						size={ButtonSizes.Small}
						borderColor={Colors.pink}
						textColor={Colors.pink}
						containerStyle={styles.secondary}
						onPress={() => relationship.onStatusAction(alias)}
					/>
				))}
			{isCurrentUser && (
				<PrimaryButton
					width={BUTTON_WIDTH}
					label={getText('button.edit.profile')}
					size={ButtonSizes.Small}
					borderColor={Colors.pink}
					textColor={Colors.pink}
					containerStyle={styles.secondary}
					onPress={onEditProfile}
				/>
			)}
			{false && (
				<PrimaryButton
					width={BUTTON_WIDTH}
					label={getText('button.message')}
					size={ButtonSizes.Small}
					borderColor={Colors.pink}
					textColor={Colors.white}
					containerStyle={styles.primary}
					onPress={onSendMessage}
				/>
			)}
		</View>
		{friends && (
			<Friends alias={alias} tabs={tabs} onViewFriends={onViewFriends} getText={getText} />
		)}
		{tabs && <Tabs onIconPress={onIconPress} activeTab={activeTab} />}
	</View>
);

export const Profile: React.SFC<IProfileProps> = (props) => (
	<WithFriends status={props.status}>
		{({ data }) => <Component {...props} {...data} />}
	</WithFriends>
);
