import * as React from 'react';
import {
	ActivityIndicator,
	StyleProp,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

import styles, { defaultColor } from './PrimaryButton.style';

export enum ButtonSizes {
	Small = 'Small',
	Normal = 'Normal',
	Large = 'Large',
}

export interface IPrimaryButtonProps {
	label: string;
	width?: number | string;
	disabled?: boolean;
	onPress: () => void;
	size?: ButtonSizes;
	autoWidth?: boolean;
	borderColor?: string;
	textColor?: string;
	loading?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
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
	const containerStyles = [
		styles.container,
		{ borderColor },
		styles['container' + size],
		containerStyle ? containerStyle : {},
		disabled ? styles.disabledButton : {},
	];

	let containerWidth: StyleProp<ViewStyle> = { width: '100%' };
	if (width) {
		containerWidth = { width };
	} else if (autoWidth) {
		containerWidth = {};
	}

	const textStyles = [
		styles.text,
		{ color: disabled ? defaultColor : textColor ? textColor : defaultColor },
		size ? styles['text' + size] : {},
	];

	const loaderColor = disabled ? defaultColor : textColor ? textColor : defaultColor;

	return (
		<TouchableOpacity disabled={disabled || loading} onPress={onPress} style={containerWidth}>
			<View style={containerStyles}>
				{!loading && <Text style={textStyles}>{label.toUpperCase()}</Text>}
				{loading && <ActivityIndicator size="small" color={loaderColor} />}
			</View>
		</TouchableOpacity>
	);
};
