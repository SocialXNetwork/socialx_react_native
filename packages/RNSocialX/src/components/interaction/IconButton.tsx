import * as React from 'react';
import {
	Image,
	ImageRequireSource,
	Text,
	TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import styles from './IconButton.style';

interface IIconButtonProps {
	label?: string;
	iconSource: ImageRequireSource | string; // use string for an Ionicon or FontAwesome source
	iconType: 'io' | 'fa' | 'image';
	onPress: () => void;
	iconStyle: any;
	textStyle?: any;
	containerStyle?: any;
}

export const IconButton: React.SFC<IIconButtonProps> = ({
	iconStyle,
	textStyle = {},
	containerStyle = {},
	label,
	iconSource,
	onPress,
	iconType,
}) => (
	<TouchableOpacity
		style={[styles.container, containerStyle]}
		disabled={!onPress}
		onPress={onPress}
	>
		{iconType === 'image' && (
			<Image
				source={iconSource as ImageRequireSource}
				style={[styles.icon, iconStyle]}
				resizeMode="contain"
			/>
		)}
		{iconType === 'io' && (
			<Ionicon name={iconSource as string} style={[styles.icon, iconStyle]} />
		)}
		{iconType === 'fa' && (
			<FontAwesome
				name={iconSource as string}
				style={[styles.icon, iconStyle]}
			/>
		)}
		{label && <Text style={[styles.label, textStyle]}>{label}</Text>}
	</TouchableOpacity>
);
