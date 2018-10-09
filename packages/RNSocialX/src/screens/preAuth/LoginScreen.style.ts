import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		backgroundColor: Colors.white,
	},
	keyboardView: {
		backgroundColor: Colors.white,
	},
	welcomeText: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(24),
		paddingTop: Sizes.smartVerticalScale(59),
		paddingBottom: Sizes.smartVerticalScale(51),
	},
	passwordContainer: {
		paddingTop: Sizes.smartVerticalScale(16),
		paddingBottom: Sizes.smartVerticalScale(20),
	},
	forgotPassword: {
		marginTop: Sizes.smartVerticalScale(25),
		padding: Sizes.smartHorizontalScale(4),
		marginBottom: Sizes.smartVerticalScale(25),
	},
	forgotPasswordText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
		color: Colors.postHour,
	},
	noAccountContainer: {
		position: 'absolute',
		bottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	noAccountQuestion: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
	},
	signUpText: {
		...Fonts.centuryGothic,
		color: Colors.postHour,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
		padding: Sizes.smartHorizontalScale(4),
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
	authErrorContainer: {
		width: '100%',
		marginBottom: Sizes.smartVerticalScale(20),
	},
	authError: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.monza,
		textAlign: 'center',
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	inputPlaceholderColor: Colors.postText,
	borderTransparent: Colors.transparent,
};
