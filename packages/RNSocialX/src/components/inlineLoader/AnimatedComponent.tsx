import * as React from 'react';
import {Animated, Easing, StyleProp, ViewStyle} from 'react-native';

const FADE_ANIMATION_DURATION = 700;

interface IAnimatedComponentProps {
	animatedStyle?: StyleProp<ViewStyle>;
}

interface IAnimatedComponentState {
	fadeAnimation: Animated.Value;
}

export class AnimatedComponent extends React.Component<IAnimatedComponentProps, IAnimatedComponentState> {
	public state = {
		fadeAnimation: new Animated.Value(0), // Initial value for opacity: 0
	};

	public componentDidMount() {
		Animated.timing(this.state.fadeAnimation, {
			toValue: 1,
			easing: Easing.ease,
			duration: FADE_ANIMATION_DURATION,
		}).start();
	}

	public render() {
		const {fadeAnimation} = this.state;
		const {animatedStyle} = this.props;

		return <Animated.View style={[animatedStyle, {opacity: fadeAnimation}]}>{this.props.children}</Animated.View>;
	}
}
