import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Fonts, Sizes} from '../../environment/theme';

export const FeedWithNoPosts: React.SFC = () => (
	<View style={styles.container}>
		<Icon name={'md-film'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
		<Text style={styles.text}>{'Your feed is empty. Start adding your first post!'}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		paddingTop: Sizes.smartVerticalScale(30),
		alignItems: 'center',
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
});
