import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Sizes } from '../../environment/theme';

interface ILoaderProps {
	visible: boolean;
}

export const Loader: React.SFC<ILoaderProps> = ({ visible }) => {
	if (visible) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return null;
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: Sizes.smartVerticalScale(20),
	},
});
