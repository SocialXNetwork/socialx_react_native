import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles, { defaultColor, HEADER_BUTTON_SIZE } from './HeaderButton.style';

interface IHeaderButtonProps {
	onPress: () => void;
	iconName: false | string;
	iconSource?: number;
	iconColor?: string;
	iconSize?: number;
}

export const HeaderButton: React.SFC<IHeaderButtonProps> = ({
	onPress = () => {
		/**/
	},
	iconName = false,
	iconSource,
	iconColor = defaultColor,
	iconSize = HEADER_BUTTON_SIZE,
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			{iconName && <Icon name={iconName} size={iconSize} color={iconColor} />}
			{iconSource ? (
				<Image source={iconSource} style={styles.icon} resizeMode="contain" />
			) : null}
		</TouchableOpacity>
	);
};
