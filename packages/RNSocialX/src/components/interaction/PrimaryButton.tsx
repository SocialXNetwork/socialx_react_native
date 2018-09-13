import * as React from 'react';
import {ActivityIndicator, StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

import {defaultColor, styles} from './PrimaryButton.style';

export enum ButtonSizes {
	Small = 'Small',
	Normal = 'Normal',
	Large = 'Large',
}

export interface IPrimaryButtonProps {
	label: string;
	width: number;
	disabled: boolean;
	onPress: () => void;
	size: ButtonSizes;
	autoWidth: boolean;
	borderColor: string;
	textColor: string;
	loading: boolean;
	containerStyle: StyleProp<ViewStyle>;
}

export const PrimaryButton: React.SFC<IPrimaryButtonProps> = ({
	label,
	onPress,
	width = 0,
	disabled = false,
	size = ButtonSizes.Normal,
	autoWidth = false,
	borderColor = defaultColor,
	textColor = defaultColor,
	loading = false,
	containerStyle = {},
}) => {
	const buttonDisabled = disabled || loading;

	const containerStyles = [
		styles.container,
		{borderColor},
		styles['container' + size],
		containerStyle ? containerStyle : {},
		buttonDisabled ? styles.disabledButton : {},
	];

	let containerWidth: StyleProp<ViewStyle> = {width: '100%'};
	if (width) {
		containerWidth = {width};
	} else if (autoWidth) {
		containerWidth = {};
	}

	const textStyles = [styles.text, {color: textColor ? textColor : defaultColor}, size ? styles['text' + size] : {}];

	return (
		<TouchableOpacity disabled={buttonDisabled} onPress={onPress} style={containerWidth}>
			<View style={containerStyles}>
				<Text style={textStyles}>{label}</Text>
				{loading && <ActivityIndicator size={'small'} color={defaultColor} style={styles.loadingIndicator} />}
			</View>
		</TouchableOpacity>
	);
};
