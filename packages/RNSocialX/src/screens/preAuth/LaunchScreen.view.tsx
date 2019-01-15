import * as React from 'react';
import { Image, Text, View } from 'react-native';

import { GradientButton, PrimaryButton, TextGradient } from '../../components';
import { Colors, Images } from '../../environment/theme';
import { IDictionary } from '../../types';
import style from './LaunchScreen.style';

interface ILaunchScreenViewProps extends IDictionary {
	onNavigateToLogin: () => void;
	onNavigateToRegister: () => void;
}

export const LaunchScreenView: React.SFC<ILaunchScreenViewProps> = ({
	dictionary,
	onNavigateToLogin,
	onNavigateToRegister,
}) => (
	<View style={style.container}>
		<Image source={Images.launch} style={style.background} resizeMode="cover" />
		<View style={style.topPaddingContainer}>
			<TextGradient
				text={dictionary.screens.launch.name}
				colors={[Colors.fuchsiaBlue, Colors.pink]}
				style={style.socialxGradient}
			/>
			<Text style={style.description}>{dictionary.screens.launch.description}</Text>
		</View>
		<TextGradient
			text={dictionary.screens.launch.rewards}
			colors={[Colors.fuchsiaBlue, Colors.pink]}
			style={style.getRewardedGradient}
		/>
		<View style={style.bottomPaddingContainer}>
			<GradientButton
				colorStart={Colors.fuchsiaBlue}
				colorEnd={Colors.pink}
				label={dictionary.screens.launch.login}
				borderColor={Colors.transparent}
				onPress={onNavigateToLogin}
			/>
			<View style={style.signUpTopPadding}>
				<PrimaryButton
					label={dictionary.screens.launch.register}
					borderColor={Colors.transparent}
					onPress={onNavigateToRegister}
				/>
			</View>
		</View>
	</View>
);
