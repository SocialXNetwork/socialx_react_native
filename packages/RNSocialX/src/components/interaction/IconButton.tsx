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
	source: ImageRequireSource | string; // use string for an Ionicon or FontAwesome source
	type: 'io' | 'fa' | 'image';
	label?: string;
	imageStyle?: StyleProp<ImageStyle>;
	iconStyle?: StyleProp<TextStyle>;
	textStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	onPress: () => void;
}

export const IconButton: React.SFC<IIconButtonProps> = ({
	imageStyle = {},
	iconStyle = {},
	textStyle = {},
	containerStyle = {},
	label,
	source,
	onPress,
	type,
}) => {
	if (label) {
		return (
			<TouchableOpacity
				style={[styles.container, containerStyle]}
				disabled={!onPress}
				onPress={onPress}
			>
				{type === 'image' && (
					<Image source={source as ImageRequireSource} style={imageStyle} resizeMode="contain" />
				)}
				{type === 'io' && <Ionicon name={source as string} style={iconStyle} />}
				{type === 'fa' && <FontAwesome name={source as string} style={iconStyle} />}
				<Text style={[styles.label, textStyle]}>{label}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity style={containerStyle} disabled={!onPress} onPress={onPress}>
			{type === 'image' && (
				<Image source={source as ImageRequireSource} style={imageStyle} resizeMode="contain" />
			)}
			{type === 'io' && <Ionicon name={source as string} style={iconStyle} />}
			{type === 'fa' && <FontAwesome name={source as string} style={iconStyle} />}
		</TouchableOpacity>
	);
};
