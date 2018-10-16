import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { IPostOwner, ITranslatedProps } from '../../../types';
import { DotsMenuButton } from '../DotsMenuButton';
import { Location, TaggedFriends } from './';

import styles, { defaultStyles, images } from './UserDetails.style';

interface IUserDetailsProps extends ITranslatedProps {
	user: IPostOwner;
	timeStampDate: string;
	timeStampHour: string;
	hideAdvancedMenu: boolean;
	hideGoToUserProfile: boolean;
	taggedFriends?: Array<{ fullName: string }>;
	location?: string;
	onUserPress: (userId: string) => void;
	onShowAdvancedMenu: () => void;
}

export const UserDetails: React.SFC<IUserDetailsProps> = ({
	user,
	timeStampDate,
	timeStampHour,
	hideAdvancedMenu,
	hideGoToUserProfile,
	taggedFriends,
	location,
	onUserPress,
	onShowAdvancedMenu,
	getText,
}) => (
	<TouchableOpacity
		onPress={() => onUserPress(user.userId)}
		style={styles.container}
		disabled={hideGoToUserProfile}
	>
		<View style={{ flex: 1 }}>
			<FastImage
				source={
					user.avatarURL.length > 0
						? { uri: user.avatarURL }
						: images.user_avatar_placeholder
				}
				style={styles.smallAvatarImage}
			/>
		</View>
		<View style={styles.details}>
			<Text style={styles.fullName}>
				{user.fullName}
				<TaggedFriends friends={taggedFriends || []} getText={getText} />
				<Location location={location} getText={getText} />
			</Text>
			<Text
				style={styles.timestamp}
			>{`${timeStampDate} at ${timeStampHour}`}</Text>
		</View>
		<View style={styles.dotsContainer}>
			{!hideAdvancedMenu && (
				<DotsMenuButton
					iconColor={defaultStyles.advancedMenuButtonColor}
					onPress={onShowAdvancedMenu}
				/>
			)}
		</View>
	</TouchableOpacity>
);
