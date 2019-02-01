import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const { height } = Dimensions.get('window');
export const HEADER_HEIGHT = Sizes.smartVerticalScale(45);
export const MINIMUM_SCROLL_DISTANCE = Sizes.smartVerticalScale(50);

export const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		height,
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
