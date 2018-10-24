import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: Sizes.smartVerticalScale(16),
		marginLeft: Sizes.smartHorizontalScale(16),
	},
	spinner: {
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.silverSand,
	},
	textContainer: {
		paddingVertical: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
};

export default StyleSheet.create(styles);
