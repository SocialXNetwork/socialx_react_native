import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
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
		paddingVertical: Sizes.smartVerticalScale(10),
	},
});
