import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		width: '85%',
		backgroundColor: Colors.white,
		shadowColor: Colors.blackWithAlpha(0.17),
		shadowOffset: { width: 1, height: 26 },
		shadowOpacity: 1,
		shadowRadius: 22,
		paddingHorizontal: Sizes.smartHorizontalScale(21),
		paddingVertical: Sizes.smartVerticalScale(12),
		zIndex: 1,
		borderRadius: Sizes.smartHorizontalScale(8),
	},
	secondLine: {
		flexDirection: 'row',
		paddingTop: Sizes.smartVerticalScale(5),
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
	},
	secondLineLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	myCoinsValue: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(30),
		lineHeight: Sizes.smartHorizontalScale(37),
	},
	trendPercentage: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.sushi,
		paddingLeft: Sizes.smartHorizontalScale(10),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(25),
		color: Colors.sushi,
	},
};

export default StyleSheet.create(styles);
export const defaultStyles = {
	transparent: Colors.transparent,
};
