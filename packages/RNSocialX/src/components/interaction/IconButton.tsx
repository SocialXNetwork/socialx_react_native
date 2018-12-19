import * as React from 'react';
import {
	Image,
	ImageRequireSource,
	ImageStyle,
	StyleProp,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import styles from './IconButton.style';

interface IIconButtonProps {
	label?: string;
	iconSource: ImageRequireSource | string; // use string for an Ionicon or FontAwesome source
	iconType: 'io' | 'fa' | 'image';
	onPress: () => void;
	iconStyle: StyleProp<ImageStyle>;
	textStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
}

export const IconButton: React.SFC<IIconButtonProps> = ({
	iconStyle,
	textStyle = {},
	containerStyle = {},
	label,
	iconSource,
	onPress,
	iconType,
}) => {
	if (label) {
		return (
			<TouchableOpacity
				style={[styles.container, containerStyle]}
				disabled={!onPress}
				onPress={onPress}
			>
				{iconType === 'image' && (
					<Image source={iconSource as ImageRequireSource} style={iconStyle} resizeMode="contain" />
				)}
				{iconType === 'io' && <Ionicon name={iconSource as string} style={iconStyle} />}
				{iconType === 'fa' && <FontAwesome name={iconSource as string} style={iconStyle} />}
				<Text style={[styles.label, textStyle]}>{label}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<React.Fragment>
			{iconType === 'image' && (
				<Image source={iconSource as ImageRequireSource} style={iconStyle} resizeMode="contain" />
			)}
			{iconType === 'io' && <Ionicon name={iconSource as string} style={iconStyle} />}
			{iconType === 'fa' && <FontAwesome name={iconSource as string} style={iconStyle} />}
		</React.Fragment>
	);
};
