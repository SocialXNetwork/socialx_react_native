import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes} from '../../environment/theme';

interface IDotsMenuButtonProps {
	iconColor: string;
	iconName: string;
	onPress: () => void;
}

export const DotsMenuButton: React.SFC<IDotsMenuButtonProps> = ({
	iconColor = Colors.white,
	iconName = 'ios-more',
	onPress = () => {
		/**/
	},
}) => (
	<TouchableOpacity onPress={onPress}>
		<Icon name={iconName} color={iconColor} style={styles.icon} />
	</TouchableOpacity>
);

const styles: any = StyleSheet.create({
	icon: {
		fontSize: Sizes.smartHorizontalScale(25),
		marginRight: Sizes.smartHorizontalScale(10),
	},
});
