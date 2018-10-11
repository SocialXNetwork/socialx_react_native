import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export interface ICenterViewProps {
	children?: object;
	style?: object;
}

export default function CenterView(props: ICenterViewProps) {
	return (
		<SafeAreaView style={[styles.main, props.style]}>
			{props.children}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ddd',
	},
});
