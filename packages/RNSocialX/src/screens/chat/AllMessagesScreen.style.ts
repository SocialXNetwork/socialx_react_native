import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		// height: SCREEN_HEIGHT,
	},
	underline: {
		height: Sizes.smartVerticalScale(1),
		backgroundColor: Colors.pink,
	},
	tab: {
		backgroundColor: Colors.white,
	},
	title: {
		...Fonts.centuryGothic,
		color: Colors.background,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	active: {
		color: Colors.pink,
	},
	entries: {
		flex: 1,
	},
});

export const tabsStyles = {
	activeTintColor: Colors.pink,
	inactiveTintColor: Colors.background,
	indicatorStyle: {
		height: 1,
		backgroundColor: Colors.pink,
	},
	pressOpacity: 1,
	upperCaseLabel: false,
	labelStyle: {
		fontSize: 14,
		...Fonts.centuryGothic,
	},
	style: {
		backgroundColor: Colors.white,
	},
};
