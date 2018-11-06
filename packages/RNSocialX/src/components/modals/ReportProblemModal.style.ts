import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

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
		shadowOffset: { width: 0, height: 4 },
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
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingVertical: Sizes.smartVerticalScale(40),
	},
	subjectContainer: {
		maxHeight: Sizes.smartVerticalScale(150),
		width: '100%',
	},
	descriptionContainer: {
		maxHeight: Sizes.smartVerticalScale(150),
		paddingTop: Sizes.smartVerticalScale(9),
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
		textTransform: 'capitalize',
	},
	buttonTextCancel: {
		color: Colors.cloudBurst,
	},
};

export default StyleSheet.create(style) as any;
