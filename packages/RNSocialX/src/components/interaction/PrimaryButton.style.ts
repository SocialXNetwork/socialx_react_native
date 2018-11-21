import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: Colors.pink,
		borderWidth: 1,
	},
	containerNormal: {
		height: Sizes.smartVerticalScale(50),
		borderRadius: Sizes.smartVerticalScale(5),
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	containerSmall: {
		height: Sizes.smartVerticalScale(36),
		borderRadius: Sizes.smartVerticalScale(4),
		paddingHorizontal: Sizes.smartHorizontalScale(13),
	},
	containerLarge: {
		height: Sizes.smartVerticalScale(60),
		borderRadius: Sizes.smartVerticalScale(5),
		paddingHorizontal: Sizes.smartHorizontalScale(25),
	},
	text: {
		...Fonts.centuryGothic,
		color: Colors.white,
		textAlign: 'center',
	},
	textNormal: {
		fontSize: Sizes.smartHorizontalScale(14),
		letterSpacing: Sizes.smartHorizontalScale(2),
	},
	textSmall: {
		fontSize: Sizes.smartHorizontalScale(12),
	},
	textLarge: {
		fontSize: Sizes.smartHorizontalScale(16),
		letterSpacing: Sizes.smartHorizontalScale(2.5),
	},
	disabledButton: {
		backgroundColor: Colors.gray,
		borderColor: Colors.gray,
	},
};

export default StyleSheet.create(styles);
export const defaultColor = Colors.white;
