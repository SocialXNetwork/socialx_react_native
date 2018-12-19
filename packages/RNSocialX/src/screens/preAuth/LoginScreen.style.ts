import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(24),
	},
	containerIOS: {
		flex: 1,
	},
	keyboardView: {
		backgroundColor: Colors.white,
	},
	welcomeText: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
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
};

export default StyleSheet.create(style);

export const customStyleProps = {
	inputPlaceholderColor: Colors.paleSky,
	borderTransparent: Colors.transparent,
};
