import { StyleSheet } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../environment/consts';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	inner: {
		flex: 1,
		paddingTop: STATUS_BAR_HEIGHT,
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
