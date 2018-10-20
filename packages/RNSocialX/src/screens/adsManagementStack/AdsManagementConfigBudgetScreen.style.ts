import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';
import { colorWithAlphaArray } from './../../environment/theme/Colors';

const styles: any = {
	container: {
		height: '100%',
		backgroundColor: Colors.wildSand,
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
		paddingLeft: Sizes.smartVerticalScale(24),
		paddingVertical: Sizes.smartVerticalScale(20),
		backgroundColor: 'white',
	},
	marginBetweenTitleAndCurrency: {
		marginBottom: Sizes.smartVerticalScale(29),
	},
	currencyContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingVertical: Sizes.smartVerticalScale(13),
	},
	currencyText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
	},
	currencyButton: {
		flexDirection: 'row',
		height: Sizes.smartHorizontalScale(18),
		paddingVertical: 0,
	},
	caretDownIcon: {
		color: Colors.pink,
		paddingLeft: Sizes.smartHorizontalScale(5),
	},
	budgetContainer: {
		backgroundColor: 'white',
		marginTop: Sizes.smartVerticalScale(30),
	},
	inputBudget: {
		flex: 1,
		padding: 0,
		textAlign: 'right',
	},
	scheduleContainer: {
		backgroundColor: 'white',
		marginTop: Sizes.smartVerticalScale(31),
	},
	optionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(15),
		paddingHorizontal: Sizes.smartHorizontalScale(27),
	},
	separator: {
		borderWidth: 1,
		borderColor: Colors.dustWhite,
		height: Sizes.smartVerticalScale(2),
	},
	darkColorText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
	},
	lightColorText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.paleSky,
		textAlign: 'left',
	},
	radioButton: {
		color: Colors.pink,
	},
	checkbox: {
		left: 0,
	},
	datePickerContainer: {
		height: Sizes.smartHorizontalScale(31),
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderRadius: 6,
		borderColor: Colors.dustWhite,
		paddingVertical: Sizes.smartVerticalScale(7),
		paddingHorizontal: Sizes.smartHorizontalScale(7),
	},
	datePickerButton: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 0,
	},
	datePickerDefaultText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.dustGray,
	},
	datePickerConfirmAndCancelBtnColor: {
		color: Colors.pink,
	},
	buttonContainer: {
		marginTop: Sizes.smartVerticalScale(20),
		paddingHorizontal: Sizes.smartHorizontalScale(28),
	},
	button: {
		borderColor: 'transparent',
	},
};

export default StyleSheet.create(styles);

export const defaultStyles: any = {
	highlightButton: Colors.pinkLace,
	checkboxColor: Colors.pink,
	pickerTitleColor: colorWithAlphaArray(Colors.alabaster, 1),
	pickerToolbarAndBgColor: colorWithAlphaArray(Colors.alabaster, 1),
	pickerConfirmAndCancelBtnColor: colorWithAlphaArray(Colors.pink, 1),
};
