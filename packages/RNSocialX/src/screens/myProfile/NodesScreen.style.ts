import { StyleSheet } from 'react-native';

import { Colors, colorWithAlphaArray, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.wildSand,
	},
	description: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		paddingVertical: Sizes.smartVerticalScale(15),
	},
	inputContainer: {
		paddingBottom: Sizes.smartVerticalScale(20),
	},
	listContainer: {
		backgroundColor: Colors.white,
	},
	listItem: {},
	separator: {
		borderWidth: 1,
		borderColor: Colors.dustWhite,
		height: Sizes.smartVerticalScale(2),
		width: '100%',
	},
	swiperDeleteButton: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: Colors.ceriseRed,
	},
	swiperDeleteIcon: {
		paddingLeft: Sizes.smartHorizontalScale(15),
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(25),
	},
};

export default StyleSheet.create(styles);

export const defaultStyles = {
	highlightColor: Colors.pink,
	datePickerConfirmAndCancelBtnColor: {
		color: Colors.pink,
	},
	highlightButton: Colors.pinkLace,
	pickerTitleColor: colorWithAlphaArray(Colors.cloudBurst, 1),
	pickerToolbarAndBgColor: colorWithAlphaArray(Colors.white, 1),
	pickerConfirmAndCancelBtnColor: colorWithAlphaArray(Colors.pink, 1),
};
