import LottieView from 'lottie-react-native';
import * as React from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

import {Animations, Sizes} from '../../environment/theme';

export interface IHeartAnimationProps {
	ended: (status: boolean) => void;
}

export class HeartAnimation extends React.Component<IHeartAnimationProps> {
	private animationProgress = new Animated.Value(0);

	componentDidMount() {
		Animated.timing(this.animationProgress, {
			toValue: 1,
			duration: 1000,
			easing: Easing.linear,
		}).start(() => {
			this.animationProgress.setValue(0);
			this.props.ended(true);
		});
	}

	render() {
		return (
			<View style={style.container}>
				<View style={style.animation}>
					<LottieView source={Animations.heart} progress={this.animationProgress} style={style.animation} />
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
