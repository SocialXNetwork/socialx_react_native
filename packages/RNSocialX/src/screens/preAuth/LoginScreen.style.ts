import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(24),
	},
	keyboardView: {
		backgroundColor: Colors.white,
	},
	welcomeText: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(24),
		marginVertical: Sizes.smartVerticalScale(50),
	},
	inputContainer: {
		width: '100%',
		marginBottom: Sizes.smartVerticalScale(16),
	},
	forgotPassword: {
		marginTop: Sizes.smartVerticalScale(25),
		padding: Sizes.smartHorizontalScale(4),
		marginBottom: Sizes.smartVerticalScale(25),
	},
	forgotPasswordText: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
		color: Colors.black,
	},
	noAccountContainer: {
		paddingBottom: Sizes.smartVerticalScale(10),
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	noAccountContainerAndroid: {
		paddingTop: Sizes.smartVerticalScale(50),
	},
	noAccountContainerIOS: {
		flex: 1,
	},
	noAccountQuestion: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
	},
	signUpText: {
		...Fonts.centuryGothicBold,
		color: Colors.black,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
		paddingHorizontal: Sizes.smartHorizontalScale(4),
	},
	fullWidth: {
		width: '100%',
	},
	screenContainer: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	errorText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.monza,
		paddingVertical: Sizes.smartVerticalScale(3),
		alignSelf: 'flex-start',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
});
