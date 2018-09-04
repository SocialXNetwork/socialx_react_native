import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {defaultColor, HEADER_BUTTON_SIZE, styles} from './ScreenHeaderButton.style';

interface IScreenHeaderButtonProps {
	onPress: () => void;
	iconName?: string;
	iconSource?: number;
	iconColor?: string;
	iconSize?: number;
}

export const ScreenHeaderButton: React.SFC<IScreenHeaderButtonProps> = ({
	onPress,
	iconName,
	iconSource,
	iconColor,
	iconSize,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.iconContainer}>
			{iconName ? <Icon name={iconName} size={iconSize} color={iconColor} /> : null}
			{iconSource ? <Image source={iconSource} style={styles.headerButtonIcon} resizeMode={'contain'} /> : null}
		</TouchableOpacity>
	);
};

ScreenHeaderButton.defaultProps = {
	iconColor: defaultColor,
	iconSize: HEADER_BUTTON_SIZE,
	iconSource: undefined,
	iconName: undefined,
};
