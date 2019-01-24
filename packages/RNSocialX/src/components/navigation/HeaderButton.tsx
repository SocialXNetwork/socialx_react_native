import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles, { defaultColor, HEADER_BUTTON_SIZE } from './HeaderButton.style';

interface IHeaderButtonProps {
	iconName: string;
	iconSource?: number;
	iconColor?: string;
	iconSize?: number;
	onPress: () => void;
}

export const HeaderButton: React.SFC<IHeaderButtonProps> = ({
	iconName,
	iconSource,
	iconColor = defaultColor,
	iconSize = HEADER_BUTTON_SIZE,
	onPress,
}) => (
	<TouchableOpacity onPress={onPress}>
		{iconName && <Icon name={iconName} size={iconSize} color={iconColor} />}
		{iconSource ? <Image source={iconSource} style={styles.icon} resizeMode="contain" /> : null}
	</TouchableOpacity>
);
