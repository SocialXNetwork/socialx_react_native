import React from 'react';
import {StyleSheet, View} from 'react-native';

export interface ICenterViewProps {
	children?: object;
	style?: object;
}

export default function CenterView(props: ICenterViewProps) {
	return <View style={[styles.main, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
	main: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
