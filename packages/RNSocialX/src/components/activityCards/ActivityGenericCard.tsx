import * as React from 'react';
import {ActivityIndicator, Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from '../';
import {IConfirmActions, IConfirmationModalProps, ITranslatedProps} from '../../types';
import style from './ActivityGenericCard.style';

interface IActivityGenericCardProps extends ITranslatedProps, IConfirmActions {
	avatarURL: string;
	fullName: string;
	username: string;
	userId: string;
	text: string;
	onCheckNotification: (requestId: string) => void;
	requestId: string;
	onViewUserProfile: (userId: string) => void;
	loading: boolean;
}

const SwipeLeftContent: React.SFC<{label: string}> = ({label}) => (
	<View style={style.leftSwipeContainer}>
		<Text style={style.leftText}>{label}</Text>
	</View>
);

const confirmDismissNotification = (
	confirmed: boolean,
	requestId: string,
	showConfirm: (confirmationOptions: IConfirmationModalProps) => void,
	hideConfirm: () => void,
	onCheckNotification: (requestId: string) => void,
	confirmTitle: string,
) => {
	if (!confirmed) {
		showConfirm({
			title: confirmTitle,
			confirmHandler: () => {
				hideConfirm();
				onCheckNotification(requestId);
			},
			declineHandler: () => {
				hideConfirm();
			},
		});
	} else {
		onCheckNotification(requestId);
	}
};

export const ActivityGenericCard: React.SFC<IActivityGenericCardProps> = ({
	loading,
	onViewUserProfile,
	userId,
	avatarURL,
	fullName,
	username,
	text,
	requestId,
	showConfirm,
	hideConfirm,
	onCheckNotification,
	getText,
}) => {
	const confirmTitle = getText('notifications.card.generic.hide.notification');
	return (
		<View style={style.container}>
			<Swipeable
				leftContent={<SwipeLeftContent label={getText('notifications.card.generic.swipeout.label')} />}
				onLeftActionRelease={() =>
					confirmDismissNotification(true, requestId, showConfirm, hideConfirm, onCheckNotification, confirmTitle)
				}
				leftActionActivationDistance={Dimensions.get('window').width / 2}
			>
				<View style={style.swipeContainer}>
					<TouchableOpacity style={style.leftContainer} onPress={() => onViewUserProfile(userId)}>
						<AvatarImage image={{uri: avatarURL}} style={style.avatarImage} />
						<View style={style.avatarNameContainer}>
							<Text style={style.fullName}>{fullName}</Text>
							{username && <Text style={style.username}>{'@' + username}</Text>}
							<Text style={style.friendRequest}>{text}</Text>
						</View>
					</TouchableOpacity>
					{!loading && (
						<TouchableOpacity
							onPress={() =>
								confirmDismissNotification(
									false,
									requestId,
									showConfirm,
									hideConfirm,
									onCheckNotification,
									confirmTitle,
								)
							}
						>
							<Icon name={'md-close'} style={style.iconButton} />
						</TouchableOpacity>
					)}
					{loading && <ActivityIndicator size={'small'} />}
				</View>
			</Swipeable>
		</View>
	);
};
