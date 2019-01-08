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
	alias: string;
	avatar: string;
	fullName: string;
	description: string;
	numberOfPosts: number;
	numberOfFriends: number;
	numberOfPhotos?: number;
	numberOfLikes?: number;
	numberOfComments?: number;
	status?: FRIEND_TYPES;
	isCurrentUser: boolean;
	tabs?: boolean;
	activeTab?: string;
	onAddFriend: () => void;
	onShowFriendshipOptions?: () => void;
	onProfilePhotoPress: () => void;
	onViewFriends: (alias: string) => void;
	onEditProfile?: () => void;
	onSendMessage?: () => void;
	onIconPress?: (tab: string) => void;
}

type IProps = IProfileTopContainerProps & IWithFriendsEnhancedData;

const Component: React.SFC<IProps> = ({
	alias,
	avatar,
	fullName,
	description,
	numberOfPosts,
	numberOfFriends,
	numberOfPhotos,
	numberOfLikes,
	numberOfComments,
	isCurrentUser,
	tabs,
	activeTab = PROFILE_TAB_ICON_TYPES.LIST,
	status,
	relationship,
	onProfilePhotoPress,
	onViewFriends,
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
			<TouchableOpacity activeOpacity={1} style={styles.leftStatistics}>
				<Statistics text={getText('my.profile.screen.statistics.posts')} value={numberOfPosts} />
				{/* <Statistics icon="image" value={numberOfPhotos} />
				<Statistics icon="heart" value={numberOfLikes} /> */}
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => onViewFriends(alias)}
				style={styles.rightStatistics}
			>
				<Statistics
					text={getText('my.profile.screen.statistics.friends')}
					value={numberOfFriends}
				/>
				{/* <Statistics icon="users" value={numberOfFriends} />
				<Statistics icon="comments" value={numberOfComments} /> */}
			</TouchableOpacity>
		</View>
		<View style={styles.textContainer}>
			<AvatarName fullName={fullName} alias={alias} />
			{description.length > 0 && <Text style={styles.about}>{description}</Text>}
		</View>
		<View style={styles.buttons}>
			{!isCurrentUser &&
				(status === FRIEND_TYPES.NOT_FRIEND ? (
					<PrimaryButton
						width={buttonWidth}
						label={relationship.action}
						loading={relationship.activity !== null && relationship.activity.payload === alias}
						size={ButtonSizes.Small}
						borderColor={colors.pink}
						textColor={colors.white}
						containerStyle={styles.primary}
						onPress={() => relationship.onStatusAction(alias)}
					/>
				) : (
					<PrimaryButton
						width={buttonWidth}
						label={relationship.action}
						loading={relationship.activity !== null && relationship.activity.payload === alias}
						size={ButtonSizes.Small}
						borderColor={colors.pink}
						textColor={colors.pink}
						containerStyle={styles.secondary}
						onPress={() => relationship.onStatusAction(alias)}
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
