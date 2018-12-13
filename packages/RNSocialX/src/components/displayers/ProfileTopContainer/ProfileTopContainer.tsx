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
import { Statistics, Tabs } from './';

import { IWithFriendsEnhancedData, WithFriends } from '../../../enhancers/intermediary';

import styles, { buttonWidth, colors } from './ProfileTopContainer.style';

interface IProfileTopContainerProps extends ITranslatedProps {
	userId: string;
	avatar: string;
	fullName: string;
	userName: string;
	description: string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFriends: number;
	numberOfComments: number;
	status?: FRIEND_TYPES;
	isCurrentUser: boolean;
	tabs?: boolean;
	activeTab?: string;
	onAddFriend: () => void;
	onShowFriendshipOptions?: () => void;
	onProfilePhotoPress: () => void;
	onEditProfile?: () => void;
	onSendMessage?: () => void;
	onIconPress?: (tab: string) => void;
}

type IProps = IProfileTopContainerProps & IWithFriendsEnhancedData;

const Component: React.SFC<IProps> = ({
	userId,
	avatar,
	fullName,
	userName,
	description,
	numberOfPhotos,
	numberOfLikes,
	numberOfFriends,
	numberOfComments,
	isCurrentUser,
	tabs,
	activeTab = PROFILE_TAB_ICON_TYPES.LIST,
	status,
	relationship,
	onProfilePhotoPress,
	onEditProfile = () => undefined,
	onSendMessage = () => undefined,
	onIconPress = () => undefined,
	getText,
}) => (
	<View style={styles.container}>
		<View style={styles.background} />
		<TouchableOpacity onPress={onProfilePhotoPress} style={styles.avatarContainer}>
			<AvatarImage image={avatar} style={styles.avatar} />
		</TouchableOpacity>
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
			<AvatarName fullName={fullName} userName={userName} />
			{description.length > 0 && <Text style={styles.about}>{description}</Text>}
		</View>
		<View style={styles.buttons}>
			{!isCurrentUser &&
				(status === FRIEND_TYPES.NOT_FRIEND ? (
					<PrimaryButton
						width={buttonWidth}
						label={relationship.action}
						loading={relationship.activity !== null && relationship.activity.payload === userId}
						size={ButtonSizes.Small}
						borderColor={colors.pink}
						textColor={colors.white}
						containerStyle={styles.primary}
						onPress={() => relationship.onStatusAction(userId)}
					/>
				) : (
					<PrimaryButton
						width={buttonWidth}
						label={relationship.action}
						loading={relationship.activity !== null && relationship.activity.payload === userId}
						size={ButtonSizes.Small}
						borderColor={colors.pink}
						textColor={colors.pink}
						containerStyle={styles.secondary}
						onPress={() => relationship.onStatusAction(userId)}
					/>
				))}
			{isCurrentUser && (
				<PrimaryButton
					width={buttonWidth}
					label={getText('button.edit.profile')}
					size={ButtonSizes.Small}
					borderColor={colors.pink}
					textColor={colors.pink}
					containerStyle={styles.secondary}
					onPress={onEditProfile}
				/>
			)}
			{false && (
				<PrimaryButton
					width={buttonWidth}
					label={getText('button.message')}
					size={ButtonSizes.Small}
					borderColor={colors.pink}
					textColor={colors.white}
					containerStyle={styles.primary}
					onPress={onSendMessage}
				/>
			)}
		</View>
		{tabs && <Tabs onIconPress={onIconPress} activeTab={activeTab} />}
	</View>
);

export const ProfileTopContainer: React.SFC<IProfileTopContainerProps> = (props) => (
	<WithFriends status={props.status}>
		{({ data }) => <Component {...props} {...data} />}
	</WithFriends>
);
