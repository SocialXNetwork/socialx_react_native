import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		backgroundColor: Colors.white,
		shadowColor: Colors.blackWithAlpha(0.17),
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 22,
		paddingHorizontal: Sizes.smartHorizontalScale(21),
		marginHorizontal: Sizes.smartHorizontalScale(18),
		zIndex: 1,
		borderRadius: Sizes.smartHorizontalScale(8),
	},
	secondLine: {
		flexDirection: 'row',
		paddingTop: Sizes.smartVerticalScale(5),
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
		paddingBottom: Sizes.smartVerticalScale(17),
	},
	secondLineRight: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	myCoinsValue: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(30),
		lineHeight: Sizes.smartHorizontalScale(37),
		paddingTop: Sizes.smartVerticalScale(22),
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	returnPercentage: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.sushi,
		paddingLeft: Sizes.smartHorizontalScale(10),
	},
	opacityGrayText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.tundora,
		opacity: 0.6,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	spacer: {
		flexDirection: 'row',
		flex: 1,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	spacerLine: {
		width: Sizes.smartHorizontalScale(2),
		height: '80%',
		backgroundColor: Colors.grayNurse,
	},
	myContribution: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.tundora,
	},
};

export default StyleSheet.create(styles);
export const customStyles = {
	iconSize: Sizes.smartHorizontalScale(23),
	iconColor: Colors.sushi,
};
