import * as React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Sizes } from '../../environment/theme';
import { IPrimaryButtonProps, PrimaryButton } from './PrimaryButton';

interface IGradientButtonProps extends IPrimaryButtonProps {
	colorStart: string;
	colorEnd: string;
}

export const GradientButton: React.SFC<IGradientButtonProps> = (props) => {
	const {
		colorStart,
		colorEnd,
		disabled,
		loading,
		size,
		...buttonProps
	} = props;

	const buttonDisabled = disabled || loading;

	return (
		<LinearGradient
			start={{ x: 0, y: 0.5 }}
			end={{ x: 1, y: 0.5 }}
			colors={[colorStart, colorEnd]}
			style={[styles.container, buttonDisabled ? styles.disabledButton : {}]}
		>
			<PrimaryButton
				{...buttonProps}
				containerStyle={styles.innerButtonContainer}
			/>
		</LinearGradient>
	);
};

const styles: any = StyleSheet.create({
	container: {
		borderRadius: Sizes.smartVerticalScale(50) / 2,
	},
	disabledButton: {
		opacity: 0.5,
	},
	innerButtonContainer: {
		backgroundColor: Colors.transparent,
	},
});
