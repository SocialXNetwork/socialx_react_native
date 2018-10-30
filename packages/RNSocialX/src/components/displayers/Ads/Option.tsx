import * as React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './Option.style';

interface IOptionProps {
	type: 'icon' | 'image';
	icon: ImageSourcePropType | string;
	text: string;
	onPress: () => void;
}

export const Option: React.SFC<IOptionProps> = ({ type, icon, text, onPress }) => (
	<TouchableOpacity onPress={onPress} style={styles.container}>
		<View style={styles.optionContainer}>
			{type === 'image' && (
				<Image source={icon as ImageSourcePropType} style={styles.image} resizeMode="contain" />
			)}
			{type === 'icon' && <Icon name={icon as string} style={styles.icon} />}
			<Text style={styles.text}>{text}</Text>
		</View>
		<View style={styles.arrowContainer}>
			<Icon name="ios-arrow-forward" style={styles.arrow} />
		</View>
	</TouchableOpacity>
);
