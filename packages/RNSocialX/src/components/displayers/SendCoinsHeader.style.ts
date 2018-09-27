import { StyleSheet } from 'react-native';
import { Colors, Fonts, Icons, Sizes } from '../../environment/theme';

const ICON_SIZE = Sizes.smartHorizontalScale(50);

const styles: any = {
	container: {
		backgroundColor: Colors.white,
		shadowColor: Colors.blackWithAlpha(0.17),
		shadowOffset: { width: 1, height: 26 },
		shadowOpacity: 1,
		shadowRadius: 22,
		zIndex: 1,
		borderRadius: Sizes.smartHorizontalScale(12),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 3,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRightColor: Colors.mercury,
		borderRightWidth: Sizes.smartHorizontalScale(1),
		flex: 1,
	},
	coinIcon: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		marginRight: Sizes.smartHorizontalScale(10),
		marginTop: Sizes.smartVerticalScale(12),
		marginBottom: Sizes.smartVerticalScale(15),
		marginLeft: Sizes.smartVerticalScale(10),
	},
	dropDownArrow: {
		justifyContent: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(11),
	},
	coinTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(24),
		lineHeight: Sizes.smartHorizontalScale(29),
		color: Colors.postFullName,
	},
	coinDetails: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.tundora,
		opacity: 0.6,
	},
	arrowIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.pink,
	},
};

export default StyleSheet.create(styles);
export const icons = Icons;
