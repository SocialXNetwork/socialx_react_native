import LottieView from 'lottie-react-native';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import { Animations, Sizes } from '../../environment/theme';

interface IHeartAnimationProps {
	animationProgress: AnimatedValue;
}

export class HeartAnimation extends React.Component<IHeartAnimationProps> {
	public render() {
		return (
			<View style={style.container}>
				<View style={style.animation}>
					<LottieView
						source={Animations.lottie.heart}
						progress={this.props.animationProgress}
						style={style.animation}
					/>
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	animation: {
		width: Sizes.smartHorizontalScale(100),
		height: Sizes.smartHorizontalScale(100),
	},
});
