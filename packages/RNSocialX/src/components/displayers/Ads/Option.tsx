import * as React from 'react';
import {
	Image,
	ImageSourcePropType,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './Option.style';

interface IOptionProps {
	icon: ImageSourcePropType;
	text: string;
	onPress: () => void;
}

export const Option: React.SFC<IOptionProps> = ({ icon, text, onPress }) => (
	<TouchableOpacity onPress={onPress} style={styles.container}>
		<View style={styles.optionContainer}>
			<Image source={icon} style={styles.icon} resizeMode="contain" />
			<Text style={styles.text}>{text}</Text>
		</View>
		<View style={styles.arrowContainer}>
			<Icon name="ios-arrow-forward" style={styles.arrow} />
		</View>
	</TouchableOpacity>
);
