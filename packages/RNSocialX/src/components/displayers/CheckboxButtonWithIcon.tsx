import {CheckBox} from 'native-base';
import * as React from 'react';
import {Image, Text, View} from 'react-native';

import styles, {defaultColor} from './CheckboxButtonWithIcon.style';

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
	<View style={styles.container}>
		<CheckBox checked={selected} onPress={onPress} color={defaultColor} style={styles.checkbox} />
		<Text style={styles.buttonText}>{text}</Text>
		{iconSource && <Image source={iconSource} style={styles.iconStyle} resizeMode={'contain'} />}
	</View>
);
