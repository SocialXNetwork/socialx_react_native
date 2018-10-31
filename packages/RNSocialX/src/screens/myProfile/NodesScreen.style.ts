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
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
	},
	nodeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingVertical: Sizes.smartVerticalScale(13),
	},
	nodeButton: {
		flexDirection: 'row',
		height: Sizes.smartHorizontalScale(18),
		paddingVertical: 0,
	},
	caretDownIcon: {
		color: Colors.pink,
		paddingLeft: Sizes.smartHorizontalScale(5),
	},
	saveChangesButton: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		marginTop: Sizes.smartVerticalScale(20),
		justifyContent: 'center',
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
