import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../environment/theme';

const style: any = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	boxContainer: {
		backgroundColor: Colors.white,
		alignItems: 'center',
		borderRadius: Sizes.smartHorizontalScale(9),
		width: '100%',
		maxWidth: 500,
		shadowColor: Colors.black,
		shadowOffset: {width: 0, height: 4},
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.rhino,
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingTop: Sizes.smartVerticalScale(14),
		paddingBottom: Sizes.smartVerticalScale(21),
	},
	message: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(21),
		color: Colors.postFullName,
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingVertical: Sizes.smartVerticalScale(15),
		textAlign: 'center',
	},
	borderContainer: {
		width: '100%',
		borderTopWidth: Sizes.smartVerticalScale(1),
		borderTopColor: Colors.mercury,
	},
	buttonsContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: Sizes.smartVerticalScale(1),
		borderTopColor: Colors.mercury,
		flexDirection: 'row',
		width: '100%',
	},
	button: {
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(16),
	},
	leftButton: {
		borderRightColor: Colors.mercury,
		borderRightWidth: Sizes.smartVerticalScale(1),
	},
	buttonText: {
		textAlign: 'center',
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(18),
	},
	flexButton: {
		flex: 1,
	},
	buttonTextConfirm: {
		color: Colors.postHour,
	},
	buttonTextCancel: {
		color: Colors.postFullName,
	},
	inputCellsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	codeInput: {
		minWidth: Sizes.smartHorizontalScale(200),
		height: Sizes.smartHorizontalScale(55),
		borderRadius: Sizes.smartHorizontalScale(5),
		borderWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.cadetBlue,
		textAlign: 'center',
		marginBottom: Sizes.smartVerticalScale(10),
		flexDirection: 'row',
	},
	inputText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(28),
		color: Colors.postFullName,
		letterSpacing: 10,
	},
	buttonDisabled: {
		opacity: 0.3,
	},
	errorMessage: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.monza,
		lineHeight: Sizes.smartHorizontalScale(24),
		width: '100%',
		textAlign: 'center',
		paddingBottom: Sizes.smartHorizontalScale(5),
	},
	disabledButton: {
		opacity: 0.4,
	},
	activityResend: {
		marginLeft: Sizes.smartHorizontalScale(20),
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	underlineColorAndroid: Colors.transparent,
	activityIndicatorColor: Colors.grayText,
};
