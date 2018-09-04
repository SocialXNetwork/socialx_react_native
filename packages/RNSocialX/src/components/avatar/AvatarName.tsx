import * as React from 'react';
import {Text, View} from 'react-native';

import {CONTAINER_HEIGHT_NAME_ONLY, fullNameDefaultColor, styles, userNameDefaultColor} from './AvatarName.style';

interface IAvatarNameProps {
	fullName: string;
	hasUsername: boolean;
	username: string;
	fullNameColor: string;
	userNameColor: string;
}

export const AvatarName: React.SFC<IAvatarNameProps> = ({
	fullName,
	username,
	hasUsername,
	fullNameColor,
	userNameColor,
}) => {
	return (
		<View style={[styles.container, !hasUsername ? {height: CONTAINER_HEIGHT_NAME_ONLY} : {}]}>
			<Text style={[styles.fullName, {color: fullNameColor}]}>{fullName}</Text>
			{hasUsername && <Text style={[styles.username, {color: userNameColor}]}>{'@' + username}</Text>}
		</View>
	);
};

AvatarName.defaultProps = {
	hasUsername: false,
	username: undefined,
	fullNameColor: fullNameDefaultColor,
	userNameColor: userNameDefaultColor,
};
