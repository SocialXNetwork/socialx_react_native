import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

interface IProps {
	heading: string;
	translateX?: Animated.AnimatedInterpolation;
	onPress?: (isActive: boolean) => void;
}

export const Tab: React.SFC<IProps> = ({ children, translateX }) => (
	<Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
		{children}
	</Animated.View>
);

const styles = StyleSheet.create({
	container: {
		width,
	},
});
