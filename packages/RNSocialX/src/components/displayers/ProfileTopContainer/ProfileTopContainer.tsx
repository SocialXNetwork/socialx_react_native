/**
 * TODO list:
 * 1. handle onSendMessage prop
 */

import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../../';
import { PROFILE_TAB_ICON_TYPES } from '../../../environment/consts';
import { ITranslatedProps, SearchResultKind } from '../../../types';
import { Statistics, Tabs } from './';
import styles, { buttonWidth, colors } from './ProfileTopContainer.style';

interface IProfileTopContainerProps extends ITranslatedProps {
	avatarURL: string;
	fullName: string;
	userName: false | string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFriends: number;
	numberOfComments: number;
	relationship?: SearchResultKind;
	isCurrentUser: boolean;
	tabs?: boolean;
	activeTab?: string;
	onAddFriend: () => void;
	onShowFriendshipOptions?: () => void;
	onProfilePhotoPress: () => void;
	onEditProfile?: () => void;
	onSendMessage?: () => void;
	onIconPress?: (tab: string) => void;
	aboutMeText: false | string;
}

export const ProfileTopContainer: React.SFC<IProfileTopContainerProps> = ({
	avatarURL,
	fullName,
	userName = false,
	numberOfPhotos,
	numberOfLikes,
	numberOfFriends,
	numberOfComments,
	relationship = SearchResultKind.NotFriend,
	isCurrentUser,
	aboutMeText = false,
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
	const relationshipButtonHandler =
		relationship === SearchResultKind.Friend ? onShowFriendshipOptions : onAddFriend;

	return (
		<View style={styles.container}>
			<View style={styles.background} />
			<TouchableOpacity onPress={onProfilePhotoPress} style={styles.avatarContainer}>
				<AvatarImage image={avatarURL} style={styles.avatar} />
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
				{userName && <Text style={styles.userName}>@{userName}</Text>}
				{aboutMeText && <Text style={styles.about}>{aboutMeText}</Text>}
			</View>
			<View style={styles.buttonsContainer}>
				{!isCurrentUser && (
					<PrimaryButton
						width={buttonWidth}
						label={
							relationship === SearchResultKind.Friend
								? getText('profile.top.container.button.friends')
								: getText('profile.top.container.button.not.friends')
						}
						size={ButtonSizes.Small}
						borderColor={colors.white}
						textColor={colors.white}
						containerStyle={styles.button}
						onPress={relationshipButtonHandler}
					/>
				)}
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
			</View>
			{tabs && <Tabs onIconPress={onIconPress} activeTab={activeTab} />}
		</View>
	);
};
