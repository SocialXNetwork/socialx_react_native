import * as React from 'react';
import {Image, ImageRequireSource, ImageStyle, StyleProp, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import styles from './IconButton.style';

interface IIconButtonProps {
	label?: string;
	iconSource: ImageRequireSource | string; // use string for an Ionicon or FontAwesome source
	iconType: string; // use "io" or "fa"
	onPress?: () => void;
	iconStyle?: StyleProp<ImageStyle>;
}

export const IconButton: React.SFC<IIconButtonProps> = ({iconStyle, label, iconSource, onPress, iconType}) => (
	<TouchableOpacity style={styles.container} disabled={!onPress} onPress={onPress}>
		{iconType === 'image' && (
			<Image source={iconSource as ImageRequireSource} style={iconStyle} resizeMode={'contain'} />
		)}
		{iconType === 'io' && <Ionicon name={iconSource as string} style={iconStyle} />}
		{iconType === 'fa' && <FontAwesome name={iconSource as string} style={iconStyle} />}
		{label && <Text style={styles.label}>{label}</Text>}
	</TouchableOpacity>
);

IconButton.defaultProps = {
	label: undefined,
	onPress: () => {
		/**/
	},
	iconStyle: styles.iconStyle,
};
