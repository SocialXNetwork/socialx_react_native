import * as React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {Sizes} from '../../environment/theme';

interface IToggleIconButtonProps {
	selectedSource: number;
	unselectedSource: number;
	selected: boolean;
	onPress: () => void;
	iconStyle: StyleProp<ImageStyle>;
}

export const ToggleIconButton: React.SFC<IToggleIconButtonProps> = ({
	onPress,
	selected,
	selectedSource,
	unselectedSource,
	iconStyle,
}) => (
	<TouchableWithoutFeedback onPress={onPress}>
		<Image source={selected ? selectedSource : unselectedSource} style={iconStyle} resizeMode={'contain'} />
	</TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
	icon: {
		width: Sizes.smartHorizontalScale(20),
		height: Sizes.smartHorizontalScale(17),
		marginRight: Sizes.smartHorizontalScale(19),
	},
});

ToggleIconButton.defaultProps = {
	selectedSource: 0,
	unselectedSource: 1,
	selected: true,
	onPress: () => {
		/**/
	},
	iconStyle: styles.icon,
};
