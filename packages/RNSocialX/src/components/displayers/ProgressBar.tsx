import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import { Colors, Sizes } from '../../environment/theme';

interface IProgressBarProps {
	progress: number;
}

export class ProgressBar extends React.Component<IProgressBarProps> {
	private progress: AnimatedValue;

	constructor(props: IProgressBarProps) {
		super(props);

		this.progress = new Animated.Value(props.progress);
	}

	public componentDidUpdate(prevProps: IProgressBarProps) {
		if (prevProps.progress !== this.props.progress) {
			Animated.timing(this.progress, {
				toValue: this.props.progress,
				duration: 300,
			}).start();
		}
	}

	public render() {
		const width = this.progress.interpolate({
			inputRange: [0, 100],
			outputRange: ['0%', '100%'],
			extrapolate: 'clamp',
		});

		return (
			<View style={styles.container}>
				<Animated.View style={[styles.inner, { width }]} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		height: Sizes.smartVerticalScale(15),
		borderRadius: Sizes.smartVerticalScale(4),
		backgroundColor: Colors.geyser,
	},
	inner: {
		backgroundColor: Colors.pink,
		borderRadius: Sizes.smartVerticalScale(4),
		position: 'absolute',
		height: '100%',
	},
});
