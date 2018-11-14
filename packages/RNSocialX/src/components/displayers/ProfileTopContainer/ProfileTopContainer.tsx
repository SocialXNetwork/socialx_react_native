/**
 * TODO list:
 * 1. handle onSendMessage prop
 * 2. implement onSendMessage handler
 */

import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../../';
import { PROFILE_TAB_ICON_TYPES } from '../../../environment/consts';
import { FRIEND_TYPES, ITranslatedProps } from '../../../types';
import { Statistics, Tabs } from './';

import styles, { buttonWidth, colors } from './ProfileTopContainer.style';

interface IProfileTopContainerProps extends ITranslatedProps {
	avatar: string;
	fullName: string;
	userName: string;
	description: string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFriends: number;
	numberOfComments: number;
	relationship?: FRIEND_TYPES;
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

export const ProfileTopContainer: React.SFC<IProfileTopContainerProps> = ({
	avatar,
	fullName,
	userName,
	description,
	numberOfPhotos,
	numberOfLikes,
	numberOfFriends,
	numberOfComments,
	relationship = FRIEND_TYPES.NOT_FRIEND,
	isCurrentUser,
	tabs,
	activeTab = PROFILE_TAB_ICON_TYPES.LIST,
	onAddFriend,
	onProfilePhotoPress,
	onShowFriendshipOptions = () => undefined,
	onEditProfile = () => undefined,
	onSendMessage = () => undefined,
	onIconPress = () => undefined,
	getText,
}) => {
	let relationshipButtonLabel;
	let relationshipButtonHandler;

	switch (relationship) {
		case FRIEND_TYPES.MUTUAL:
			relationshipButtonLabel = getText('profile.top.container.button.friends');
			relationshipButtonHandler = onShowFriendshipOptions;
			break;
		case FRIEND_TYPES.PENDING:
			relationshipButtonLabel = getText('profile.top.container.button.pending');
			relationshipButtonHandler = onShowFriendshipOptions; // TODO: Implement cancel request handler
			break;
		case FRIEND_TYPES.NOT_FRIEND:
			relationshipButtonLabel = getText('profile.top.container.button.not.friends');
			relationshipButtonHandler = onAddFriend;
			break;
		default:
			relationshipButtonLabel = getText('profile.top.container.button.not.friends');
			relationshipButtonHandler = onAddFriend;
			break;
	}

	return (
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
				<Text style={styles.name}>{fullName}</Text>
				<Text style={styles.userName}>@{userName}</Text>
				{description.length > 0 && <Text style={styles.about}>{description}</Text>}
			</View>
			<View style={styles.buttonsContainer}>
				{!isCurrentUser && (
					<PrimaryButton
						width={buttonWidth}
						label={relationshipButtonLabel}
						size={ButtonSizes.Small}
						borderColor={colors.white}
						textColor={colors.white}
						containerStyle={styles.button}
						onPress={relationshipButtonHandler}
					/>
				)}
				{isCurrentUser && (
					<PrimaryButton
						width={buttonWidth}
						label={
							isCurrentUser
								? getText('profile.top.container.button.edit.profile')
								: getText('profile.top.container.button.send.message')
						}
						size={ButtonSizes.Small}
						borderColor={colors.pink}
						textColor={colors.pink}
						containerStyle={styles.ghostButton}
						onPress={isCurrentUser ? onEditProfile : onSendMessage}
					/>
				)}
			</View>
			{tabs && <Tabs onIconPress={onIconPress} activeTab={activeTab} />}
		</View>
	);
};
