import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../environment/theme';

const style: any = {
	container: {
		flex: 1,
		margin: 0,
		paddingHorizontal: Sizes.smartHorizontalScale(32),
	},
	blurView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	keyboardView: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	boxContainer: {
		backgroundColor: Colors.white,
		alignItems: 'center',
		borderRadius: Sizes.smartHorizontalScale(9),
		maxWidth: 500,
		shadowColor: Colors.black,
		shadowOffset: {width: 0, height: 4},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		width: '100%',
		overflow: 'hidden',
	},
	titleContainer: {
		width: '100%',
		backgroundColor: Colors.pink,
		alignItems: 'center',
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.white,
		paddingTop: Sizes.smartVerticalScale(14),
		paddingBottom: Sizes.smartVerticalScale(21),
	},
	inputContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingTop: Sizes.smartVerticalScale(40),
	},
	pickerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: '100%',
		borderRadius: Sizes.smartHorizontalScale(6),
		borderColor: Colors.mercury,
		borderWidth: Sizes.smartHorizontalScale(2),
		padding: Sizes.smartVerticalScale(5),
		height: Sizes.smartVerticalScale(30),
	},
	pickerStyle: {
		position: 'absolute',
		width: '100%',
	},
	dropdownStyle: {
		width: '68%',
	},
	dropdownTextStyle: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(18),
		paddingRight: '10%',
		paddingLeft: Sizes.smartHorizontalScale(10),
	},
	iconContainer: {
		width: '100%',
		alignItems: 'flex-end',
	},
	icon: {
		height: Sizes.smartVerticalScale(5),
		width: Sizes.smartHorizontalScale(8),
		marginLeft: Sizes.smartHorizontalScale(5),
		marginRight: Sizes.smartHorizontalScale(10),
	},
	descriptionContainer: {
		maxHeight: Sizes.smartVerticalScale(150),
		paddingTop: Sizes.smartVerticalScale(9),
		paddingBottom: Sizes.smartVerticalScale(21),
		width: '100%',
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderTopColor: Colors.mercury,
		borderTopWidth: Sizes.smartVerticalScale(1),
	},
	button: {
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(16),
		flex: 1,
	},
	leftButton: {
		borderRightColor: Colors.mercury,
		borderRightWidth: Sizes.smartVerticalScale(1),
	},
	buttonText: {
		textAlign: 'center',
		...Fonts.centuryGothic,
		color: Colors.grayText,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(18),
	},
	buttonTextConfirm: {
		color: Colors.postHour,
	},
	buttonTextCancel: {
		color: Colors.postFullName,
	},
};

export default StyleSheet.create(style);
