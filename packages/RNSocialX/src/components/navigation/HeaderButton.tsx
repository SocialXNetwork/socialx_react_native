import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { defaultColor, HEADER_BUTTON_SIZE, styles } from './HeaderButton.style';

interface IHeaderButtonProps {
	onPress: () => void;
	iconName: false | string;
	iconSource?: number;
	iconColor?: string;
	iconSize?: number;
}

export const HeaderButton: React.SFC<IHeaderButtonProps> = ({
	onPress,
	iconName = false,
	iconSource,
	iconColor = defaultColor,
	iconSize = HEADER_BUTTON_SIZE,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.iconContainer}>
			{iconName ? (
				<Icon name={iconName} size={iconSize} color={iconColor} />
			) : null}
			{iconSource ? (
				<Image
					source={iconSource}
					style={styles.headerButtonIcon}
					resizeMode={'contain'}
				/>
			) : null}
		</TouchableOpacity>
	);
};
