import * as React from 'react';
import { Image, Text, View } from 'react-native';

import { GradientButton, PrimaryButton, TextGradient } from '../../components';
import { ITranslatedProps } from '../../types';
import style, { customStylesProps } from './LaunchScreen.style';

interface ILaunchScreenViewProps extends ITranslatedProps {
	navigateToRegisterScreen: () => void;
	navigateToLoginScreen: () => void;
}

export const LaunchScreenView: React.SFC<ILaunchScreenViewProps> = ({
	getText,
	navigateToRegisterScreen,
	navigateToLoginScreen,
}) => (
	<View style={style.container}>
		<Image
			source={customStylesProps.launchScreenBackground}
			style={style.background}
			resizeMode="cover"
		/>
		<View style={style.topPaddingContainer}>
			<TextGradient
				text={getText('app.name')}
				colors={[customStylesProps.gradientTextStartColor, customStylesProps.gradientTextEndColor]}
				style={style.socialxGradient}
			/>
			<Text style={style.description}>{getText('launch.description')}</Text>
		</View>
		<TextGradient
			text={getText('launch.get.rewarded')}
			colors={[customStylesProps.gradientTextStartColor, customStylesProps.gradientTextEndColor]}
			style={style.getRewardedGradient}
		/>
		<View style={style.bottomPaddingContainer}>
			<GradientButton
				colorStart={customStylesProps.gradientTextStartColor}
				colorEnd={customStylesProps.gradientTextEndColor}
				label={getText('launch.login')}
				borderColor={customStylesProps.transparentBorderColor}
				onPress={navigateToLoginScreen}
			/>
			<View style={style.signUpTopPadding}>
				<PrimaryButton
					label={getText('launch.signUp')}
					borderColor={customStylesProps.transparentBorderColor}
					onPress={navigateToRegisterScreen}
				/>
			</View>
		</View>
	</View>
);
