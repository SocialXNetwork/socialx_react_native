import {Platform, StyleSheet} from 'react-native';

import {Colors, Fonts, Images, Sizes} from '../../environment/theme';

const style: any = {
	container: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: Colors.white,
		paddingBottom: Sizes.smartVerticalScale(78),
	},
	keyboardView: {
		backgroundColor: Colors.white,
	},
	buttonContainer: {
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(20),
		paddingHorizontal: Sizes.smartHorizontalScale(28),
	},
	orText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
	},
	textInputContainer: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: Colors.dustWhite,
	},
	textInputContainerFirst: {
		borderTopWidth: 1,
		borderTopColor: Colors.dustWhite,
	},
	directionRow: {
		flexDirection: 'row',
	},
	avatarPickerContainer: {
		padding: Sizes.smartHorizontalScale(10),
	},
	phoneInputIconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: Sizes.smartHorizontalScale(40),
	},
	phoneNumberInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		color: Colors.shuttleGray,
		flex: 1,
		maxHeight: '100%',
		paddingVertical: Platform.select({
			android: Sizes.smartHorizontalScale(10),
			default: Sizes.smartHorizontalScale(16),
		}),
	},
	countryPickerContainer: {
		maxHeight: '100%',
		paddingLeft: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
		flexDirection: 'row',
	},
	countryCode: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		paddingLeft: Sizes.smartHorizontalScale(10),
		color: Colors.shuttleGray,
	},
	termsContainer: {
		flexDirection: 'row',
		paddingTop: Sizes.smartVerticalScale(15),
		alignItems: 'center',
	},
	acceptText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
	},
	acceptTextLink: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postHour,
		padding: Sizes.smartHorizontalScale(5),
	},
	acceptCheckbox: {
		left: 0,
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	errorText: {
		...Fonts.centuryGothic,
		color: Colors.monza,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(16),
	},
	errorContainer: {
		zIndex: 1,
		marginHorizontal: '5%',
		marginTop: Sizes.smartVerticalScale(5),
		marginBottom: -Sizes.smartVerticalScale(5),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		width: '90%',
	},
	boldText: {
		...Fonts.centuryGothicBold,
	},
	phoneIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.iron,
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	defaultAvatarImage: Images.user_avatar_placeholder,
};
