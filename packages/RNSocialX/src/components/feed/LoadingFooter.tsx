import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {Sizes} from '../../environment/theme';

export const LoadingFooter: React.SFC<{hasMore: boolean}> = ({hasMore}) => {
	if (hasMore) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size={'large'} />
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
