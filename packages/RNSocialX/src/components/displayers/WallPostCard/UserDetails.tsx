import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { ITranslatedProps } from '../../../types';
import { DotsMenuButton } from '../DotsMenuButton';
import { Location, TaggedFriends } from './';
import styles, { customStyleProps } from './UserDetails.style';

interface IUserDetailsProps extends ITranslatedProps {
	user: any; // IUserQuery; // TODO: @Alex fix typing after backend is ready
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
		style={styles.topContainer}
		disabled={hideGoToUserProfile}
	>
		<FastImage
			source={{ uri: user.avatarURL }}
			style={styles.smallAvatarImage}
		/>
		<View style={styles.topRightContainer}>
			<Text style={styles.fullName}>
				{user.fullName}
				<TaggedFriends friends={taggedFriends || []} getText={getText} />
				<Location location={location} getText={getText} />
			</Text>
			<Text
				style={styles.timestamp}
			>{`${timeStampDate} at ${timeStampHour}`}</Text>
		</View>
		{!hideAdvancedMenu && (
			<DotsMenuButton
				iconColor={customStyleProps.advancedMenuButtonColor}
				onPress={onShowAdvancedMenu}
			/>
		)}
	</TouchableOpacity>
);
