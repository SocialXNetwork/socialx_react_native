import {CheckBox} from 'native-base';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Colors, Fonts, Sizes} from '../../environment/theme';

interface ICheckboxButtonWithIconProps {
	selected: boolean;
	onPress: () => void;
	iconSource: false | number;
	text: string;
}

export const CheckboxButtonWithIcon: React.SFC<ICheckboxButtonWithIconProps> = ({
	selected,
	onPress = () => {
		/**/
	},
	iconSource = false,
	text,
}) => (
	<View style={style.container}>
		<CheckBox checked={selected} onPress={onPress} color={Colors.pink} style={style.checkbox} />
		<Text style={style.buttonText}>{text}</Text>
		{iconSource && <Image source={iconSource} style={style.iconStyle} resizeMode={'contain'} />}
	</View>
);

const style: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	buttonText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		marginLeft: Sizes.smartHorizontalScale(12),
		marginRight: Sizes.smartHorizontalScale(10),
	},
	iconStyle: {
		width: Sizes.smartHorizontalScale(20),
		height: Sizes.smartHorizontalScale(20),
	},
	checkbox: {
		left: 0,
	},
});

export default StyleSheet.create(style);
