import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Colors, colorWithAlpha } from '../../environment/theme';

interface IProps {
	visible: boolean;
	alpha: number;
	loader?: boolean;
}

export const TransparentOverlay: React.SFC<IProps> = ({ visible, alpha, loader }) => (
	<View
		pointerEvents={visible ? 'auto' : 'none'}
		style={[
			StyleSheet.absoluteFill,
			styles.container,
			{
				backgroundColor: visible ? colorWithAlpha(Colors.black, alpha) : Colors.transparent,
			},
		]}
	>
		{loader && <ActivityIndicator size="large" color={Colors.white} />}
	</View>
);

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
