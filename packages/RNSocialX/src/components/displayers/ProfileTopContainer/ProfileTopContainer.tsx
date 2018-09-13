import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage, ButtonSizes, PrimaryButton} from '../../';
import {PROFILE_TAB_ICON_TYPES} from '../../../environment/consts';
import {ITranslatedProps, SearchResultKind} from '../../../types';
import {Statistics, Tabs} from './';
import styles, {buttonWidth, colors} from './ProfileTopContainer.style';

interface IProfileTopContainerProps extends ITranslatedProps {
	avatarURL: any;
	fullName: string;
	userName: false | string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFriends: number;
	numberOfViews: number;
	onAddFriend: () => void;
	onShowFriendshipOptions: () => void;
	relationship: SearchResultKind;
	onViewProfilePhoto: () => void;
	isCurrentUser: boolean;
	onEditProfile: () => void;
	tabs: boolean;
	activeTab: string;
	onIconPress: (tab: string) => void;
	aboutMeText: false | string;
}

export const ProfileTopContainer: React.SFC<IProfileTopContainerProps> = ({
	avatarURL,
	fullName,
	userName = false,
	numberOfPhotos,
	numberOfLikes,
	numberOfFriends,
	numberOfViews,
	onAddFriend,
	onShowFriendshipOptions = () => {
		/**/
	},
	relationship = SearchResultKind.NotFriend,
	onViewProfilePhoto,
	isCurrentUser,
	onEditProfile = () => {
		/**/
	},
	onIconPress,
	aboutMeText = false,
	tabs,
	activeTab = PROFILE_TAB_ICON_TYPES.LIST,
	getText,
}) => {
	const relationshipButtonHandler = relationship === SearchResultKind.Friend ? onShowFriendshipOptions : onAddFriend;

	return (
		<View style={styles.topContainer}>
			<View style={styles.background} />
			<TouchableOpacity activeOpacity={1} onPress={onViewProfilePhoto} style={styles.avatarContainer}>
				<AvatarImage image={avatarURL} style={styles.avatar} />
			</TouchableOpacity>
			<View style={styles.statisticsContainer}>
				<View style={styles.leftStatistics}>
					<Statistics text={getText('profile.statistics.photos')} value={numberOfPhotos} />
					<Statistics text={getText('profile.statistics.likes')} value={numberOfLikes} />
				</View>
				<View style={styles.rightStatistics}>
					<Statistics text={getText('profile.statistics.friends')} value={numberOfFriends} />
					<Statistics text={getText('profile.statistics.view.count')} value={numberOfViews} />
				</View>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.name}>{fullName}</Text>
				{userName && <Text style={styles.userName}>@{userName}</Text>}
				{aboutMeText && <Text style={styles.about}>{aboutMeText}</Text>}
			</View>
			<View style={styles.buttonsContainer}>
				{!isCurrentUser && (
					// @ts-ignore
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
				{
					// @ts-ignore
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
						onPress={isCurrentUser ? onEditProfile : () => console.log('Message')}
					/>
				}
			</View>
			{tabs && <Tabs onIconPress={onIconPress} activeTab={activeTab} />}
		</View>
	);
};
