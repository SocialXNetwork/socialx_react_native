import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: Sizes.smartVerticalScale(10),
	},
	spinner: {
		marginHorizontal: Sizes.smartHorizontalScale(15),
		paddingLeft: Sizes.smartHorizontalScale(15),
		paddingRight: Sizes.smartHorizontalScale(15),
	},
	results: {
		paddingLeft: Sizes.smartHorizontalScale(16),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.silverSand,
	},
});
