import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Sizes } from '../../environment/theme';

interface ILoaderProps {
	visible: boolean;
	small?: boolean;
}

export const Loader: React.SFC<ILoaderProps> = ({ visible, small }) => {
	if (visible) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size={small ? 'small' : 'large'} />
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
