import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../environment/theme';
import styles, { HEADER_BUTTON_SIZE } from './HeaderButton.style';

interface IProps {
	iconName: string;
	iconSource?: number;
	iconColor?: string;
	iconSize?: number;
	onPress: () => void;
}

export const HeaderButton: React.SFC<IProps> = ({
	iconName,
	iconSource,
	iconColor = Colors.white,
	iconSize = HEADER_BUTTON_SIZE,
	onPress,
}) => (
	<TouchableOpacity onPress={onPress}>
		{iconName && <Icon name={iconName} size={iconSize} color={iconColor} />}
		{iconSource && <Image source={iconSource} style={styles.icon} resizeMode="contain" />}
	</TouchableOpacity>
);
