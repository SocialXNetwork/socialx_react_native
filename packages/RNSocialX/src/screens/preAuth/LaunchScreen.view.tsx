import React from 'react';
import { Image, ImageStyle, Text, View } from 'react-native';

import { GradientButton, PrimaryButton, TextGradient } from '../../components';
import { Colors, Images } from '../../environment/theme';
import { IDictionary } from '../../types';
import styles from './LaunchScreen.style';

interface IProps extends IDictionary {
	onLoginPress: () => void;
	onRegisterPress: () => void;
}

export const LaunchScreenView: React.SFC<IProps> = ({
	dictionary,
	onLoginPress,
	onRegisterPress,
}) => (
	<View style={styles.container}>
		<Image source={Images.launch} style={styles.background as ImageStyle} resizeMode="cover" />
		<View style={styles.topPaddingContainer}>
			<TextGradient
				text={dictionary.screens.launch.name}
				colors={[Colors.fuchsiaBlue, Colors.pink]}
				style={styles.socialxGradient}
			/>
			<Text style={styles.description}>{dictionary.screens.launch.description}</Text>
		</View>
		<TextGradient
			text={dictionary.screens.launch.rewards}
			colors={[Colors.fuchsiaBlue, Colors.pink]}
			style={styles.getRewardedGradient}
		/>
		<View style={styles.bottomPaddingContainer}>
			<GradientButton
				colorStart={Colors.fuchsiaBlue}
				colorEnd={Colors.pink}
				label={dictionary.screens.launch.login}
				borderColor={Colors.transparent}
				onPress={onLoginPress}
			/>
			<View style={styles.signUpTopPadding}>
				<PrimaryButton
					label={dictionary.screens.launch.register}
					borderColor={Colors.transparent}
					onPress={onRegisterPress}
				/>
			</View>
		</View>
	</View>
);
