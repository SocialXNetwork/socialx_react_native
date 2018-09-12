import * as React from 'react';
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from '../';
import {ITranslatedProps} from '../../types';
import style, {customStyleProps} from './ActivityFriendRequestCard.style';

interface IFriendRequestProps extends ITranslatedProps {
	avatarURL: string;
	fullName: string;
	username: string;
	userId: string;
	onRequestConfirmed: () => void;
	onRequestDeclined: () => void;
	onViewUserProfile: (userId: string) => void;
	loadingConfirmed: boolean;
	loadingDeclined: boolean;
}

const InlineLoader: React.SFC = () => (
	<View style={style.iconTouch}>
		<ActivityIndicator size={'small'} />
	</View>
);

export const ActivityFriendRequestCard: React.SFC<IFriendRequestProps> = ({
	loadingConfirmed,
	loadingDeclined,
	username,
	fullName,
	userId,
	onViewUserProfile,
	avatarURL,
	onRequestConfirmed,
	onRequestDeclined,
	getText,
}) => {
	const isLoading = loadingConfirmed || loadingDeclined;
	return (
		<View style={style.container}>
			<TouchableOpacity style={style.leftContainer} onPress={() => onViewUserProfile(userId)}>
				<AvatarImage image={avatarURL} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{fullName}</Text>
					{username !== '' && <Text style={style.username}>{'@' + username}</Text>}
					<Text style={style.friendRequest}>{getText('notifications.card.friend.request.title')}</Text>
				</View>
			</TouchableOpacity>
			{!loadingConfirmed && (
				<TouchableOpacity onPress={onRequestConfirmed} style={style.iconTouch} disabled={isLoading}>
					<Image source={customStyleProps.iconRequestConfirmed} style={style.iconImage} />
				</TouchableOpacity>
			)}
			{loadingConfirmed && <InlineLoader />}
			{!loadingDeclined && (
				<TouchableOpacity onPress={onRequestDeclined} style={style.iconTouch} disabled={isLoading}>
					<Image source={customStyleProps.iconRequestDeclined} style={style.iconImage} />
				</TouchableOpacity>
			)}
			{loadingDeclined && <InlineLoader />}
		</View>
	);
};
