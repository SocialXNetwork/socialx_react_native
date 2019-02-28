import * as React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';

import { Images, Sizes } from '../../environment/theme';

export const HeaderLogo = () => (
	<Image source={Images.IntroWalkThrough1Logo} style={styles.logo as ImageStyle} />
);

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: Sizes.smartVerticalScale(25),
		resizeMode: 'contain',
	},
});
