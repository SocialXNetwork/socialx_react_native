import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.white,
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	topPaddingContainer: {
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(61),
		paddingHorizontal: Sizes.smartHorizontalScale(33),
	},
	socialxGradient: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(45),
	},
	getRewardedGradient: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(68),
		lineHeight: Sizes.smartHorizontalScale(83),
		maxWidth: Sizes.smartHorizontalScale(400),
		paddingLeft: Sizes.smartHorizontalScale(33),
		width: '100%',
		paddingBottom: Sizes.smartVerticalScale(108),
	},
	description: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.dustyGray,
		paddingTop: Sizes.smartVerticalScale(20),
		paddingBottom: Sizes.smartVerticalScale(20),
	},
	bottomPaddingContainer: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(27),
	},
	signUpTopPadding: {
		paddingTop: Sizes.smartVerticalScale(19),
	},
});
