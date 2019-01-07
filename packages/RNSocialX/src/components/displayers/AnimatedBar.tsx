import * as React from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

import { Sizes } from '../../environment/theme';

interface IAnimatedBarProps {
	barWidth: Animated.Value;
	barColor: string;
	barHeight: number;
}

export class AnimatedBar extends React.Component<IAnimatedBarProps> {
	constructor(props: IAnimatedBarProps) {
		super(props);

		Animated.timing(this.props.barWidth, {
			toValue: 100,
			duration: 1000,
			easing: Easing.linear,
		}).start();
	}

	public render() {
		const { barWidth, barHeight, barColor } = this.props;

		const width = barWidth.interpolate({
			inputRange: [0, 100],
			outputRange: ['0%', '100%'],
		});

		return (
			<Animated.View
				style={[
					styles.bar,
					{
						backgroundColor: barColor,
						width,
						paddingVertical: Sizes.smartVerticalScale(barHeight / 2),
					},
				]}
			/>
		);
	}
}

const styles = StyleSheet.create({
	bar: {
		position: 'absolute',
		top: 0,
		left: 0,
		borderRadius: Sizes.smartVerticalScale(10),
	},
});
