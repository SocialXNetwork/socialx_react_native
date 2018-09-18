import * as React from 'react';
import {Image, Text, View} from 'react-native';

import {GradientButton, PrimaryButton, TextGradient} from '../../components';
import {ITranslatedProps} from '../../types';
import style, {customStylesProps} from './LaunchScreen.style';

interface ILaunchScreenViewProps extends ITranslatedProps {
	navigateToSignUpScreen: () => void;
	navigateToLoginScreen: () => void;
}

export const LaunchScreenView: React.SFC<ILaunchScreenViewProps> = ({
	getText,
	navigateToSignUpScreen,
	navigateToLoginScreen,
}) => (
	<View style={style.container}>
		<Image source={customStylesProps.launchScreenBackground} style={style.background} resizeMode={'cover'} />
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
			{
				// @ts-ignore
				<GradientButton
					colorStart={customStylesProps.gradientTextStartColor}
					colorEnd={customStylesProps.gradientTextEndColor}
					label={getText('launch.login')}
					borderColor={customStylesProps.transparentBorderColor}
					onPress={navigateToLoginScreen}
				/>
			}
			<View style={style.signUpTopPadding}>
				{
					// @ts-ignore
					<PrimaryButton
						label={getText('launch.signUp')}
						borderColor={customStylesProps.transparentBorderColor}
						onPress={navigateToSignUpScreen}
					/>
				}
			</View>
		</View>
	</View>
);
