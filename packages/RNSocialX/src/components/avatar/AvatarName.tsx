import * as React from 'react';
import { Text, View } from 'react-native';

import {
	CONTAINER_HEIGHT_NAME_ONLY,
	fullNameDefaultColor,
	styles,
	userNameDefaultColor,
} from './AvatarName.style';

interface IAvatarNameProps {
	fullName: string;
	userName: false | string;
	fullNameColor: string;
	userNameColor: string;
}

export const AvatarName: React.SFC<IAvatarNameProps> = ({
	fullName,
	userName = false,
	fullNameColor = fullNameDefaultColor,
	userNameColor = userNameDefaultColor,
}) => {
	const hasUsername = userName && userName !== '';
	return (
		<View style={[styles.container, !hasUsername ? { height: CONTAINER_HEIGHT_NAME_ONLY } : {}]}>
			<Text style={[styles.fullName, { color: fullNameColor }]}>{fullName}</Text>
			{hasUsername && (
				<Text style={[styles.userName, { color: userNameColor }]}>{'@' + userName}</Text>
			)}
		</View>
	);
};
