import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../environment/theme';

const styles: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	buttonText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		marginLeft: Sizes.smartHorizontalScale(12),
		marginRight: Sizes.smartHorizontalScale(10),
	},
	iconStyle: {
		width: Sizes.smartHorizontalScale(20),
		height: Sizes.smartHorizontalScale(20),
	},
	checkbox: {
		left: 0,
	},
};

export const defaultColor = Colors.pink;
export default StyleSheet.create(styles);
