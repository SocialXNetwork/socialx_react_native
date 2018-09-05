import * as React from 'react';
import {Text, View} from 'react-native';

import {AvatarImage, ButtonSizes, PrimaryButton} from '../../';
import {PROFILE_TAB_ICON_TYPES} from '../../../environment/consts';
import {ITranslatedProps, SearchResultKind} from '../../../types';
import {Statistics, Tabs} from './';
import styles, {buttonWidth, colors} from './ProfileTopContainer.style';

export interface ITopContainerSharedProps extends ITranslatedProps {
	avatarURL: any;
	fullName: string;
	username: false | string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfViews: number;
	onAddFriend: () => Promise<any>;
	onShowFriendshipOptions: () => void;
	friendRequestStatus: SearchResultKind;
	onViewProfilePhoto?: () => void;
	ownUser: boolean;
	onEditProfile: () => void;
	tabs: boolean;
	activeTab: string;
	onIconPress: () => void;
	aboutMeText: false | string;
}

export const ProfileTopContainer: React.SFC<ITopContainerSharedProps> = ({
	avatarURL,
	fullName,
	username = false,
	numberOfPhotos,
	numberOfLikes,
	numberOfFollowers,
	numberOfViews,
	onAddFriend = async () => {
		/**/
	},
	onShowFriendshipOptions = () => {
		/**/
	},
	friendRequestStatus = SearchResultKind.NotFriend,
	ownUser,
	onEditProfile = () => {
		/**/
	},
	onIconPress = () => {
		/**/
	},
	aboutMeText = false,
	tabs,
	activeTab = PROFILE_TAB_ICON_TYPES.LIST,
	getText,
}) => {
	const friendButtonHandler = friendRequestStatus === SearchResultKind.Friend ? onShowFriendshipOptions : onAddFriend;

	return (
		<View style={styles.topContainer}>
			<View style={styles.background} />
			<View style={styles.avatarContainer}>
				<AvatarImage image={{uri: avatarURL}} style={styles.avatar} />
			</View>
			<View style={styles.statisticsContainer}>
				<View style={styles.leftStatistics}>
					<Statistics text={getText('profile.statistics.photos')} value={numberOfPhotos} />
					<Statistics text={getText('profile.statistics.likes')} value={numberOfLikes} />
				</View>
				<View style={styles.rightStatistics}>
					<Statistics text={getText('profile.statistics.friends')} value={numberOfFollowers} />
					<Statistics text={getText('profile.statistics.view.count')} value={numberOfViews} />
				</View>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.name}>{fullName}</Text>
				{username && <Text style={styles.username}>@{username}</Text>}
				{aboutMeText && <Text style={styles.about}>{aboutMeText}</Text>}
			</View>
			<View style={styles.buttonsContainer}>
				{!ownUser && (
					// @ts-ignore
					<PrimaryButton
						width={buttonWidth}
						label={
							friendRequestStatus === SearchResultKind.Friend
								? getText('profile.top.container.button.friends')
								: getText('profile.top.container.button.not.friends')
						}
						size={ButtonSizes.Small}
						borderColor={colors.white}
						textColor={colors.white}
						containerStyle={styles.button}
						onPress={friendButtonHandler}
					/>
				)}
				// @ts-ignore
				<PrimaryButton
					width={buttonWidth}
					label={
						ownUser
							? getText('profile.top.container.button.edit.profile')
							: getText('profile.top.container.button.send.message')
					}
					size={ButtonSizes.Small}
					borderColor={colors.pink}
					textColor={colors.pink}
					containerStyle={styles.ghostButton}
					onPress={ownUser ? onEditProfile : () => console.log('Message')}
				/>
			</View>
			{tabs && <Tabs onIconPress={onIconPress!} activeTab={activeTab!} />}
		</View>
	);
};
