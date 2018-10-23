import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors, Sizes } from '../../environment/theme';

interface IDotsMenuButtonProps {
	iconColor?: string;
	iconName?: string;
	onPress: () => void;
	disabled?: boolean;
}

export const DotsMenuButton: React.SFC<IDotsMenuButtonProps> = ({
	iconColor = Colors.white,
	iconName = 'ios-more',
	onPress = () => undefined,
	disabled,
}) => (
	<TouchableOpacity onPress={onPress} disabled={disabled}>
		<Icon name={iconName} color={iconColor} style={styles.icon} />
	</TouchableOpacity>
);

const styles: any = StyleSheet.create({
	icon: {
		fontSize: Sizes.smartHorizontalScale(25),
	},
});
