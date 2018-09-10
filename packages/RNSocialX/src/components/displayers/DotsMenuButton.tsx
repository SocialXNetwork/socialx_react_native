import * as React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes} from '../../environment/theme';

interface IDotsMenuButtonProps {
	iconColor: string;
	iconName: string;
	onPress: () => void;
}

export const DotsMenuButton: React.SFC<IDotsMenuButtonProps> = ({
	iconColor = Colors.postFullName,
	iconName = 'ios-more',
	onPress = () => {
		/**/
	},
}) => (
	<TouchableWithoutFeedback onPress={onPress} style={styles.container}>
		<Icon name={iconName} color={iconColor} style={styles.icon} />
	</TouchableWithoutFeedback>
);

const styles: any = StyleSheet.create({
	container: {
		padding: Sizes.smartHorizontalScale(7),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(25),
	},
});
