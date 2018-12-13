import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		paddingVertical: Sizes.smartVerticalScale(16),
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: Sizes.smartVerticalScale(10),
	},
	spinner: {
		marginHorizontal: Sizes.smartHorizontalScale(15),
		paddingRight: Sizes.smartHorizontalScale(15),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.silverSand,
	},
};

export default StyleSheet.create(styles);
