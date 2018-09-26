import { StyleSheet } from 'react-native';

import { Colors, Fonts, Images, Sizes } from '../../environment/theme';

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
	pickerContainer: {
		paddingTop: Sizes.smartVerticalScale(25),
		paddingBottom: Sizes.smartVerticalScale(9),
	},
	aboutContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		marginTop: Sizes.smartVerticalScale(19),
		marginBottom: Sizes.smartVerticalScale(33),
		maxHeight: Sizes.smartVerticalScale(120),
	},
	personalDetails: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postFullName,
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingBottom: Sizes.smartHorizontalScale(7),
	},
	textInputContainer: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartVerticalScale(5),
		borderBottomWidth: 1,
		borderBottomColor: Colors.dustWhite,
	},
	textInputContainerFirst: {
		borderTopWidth: 1,
		borderTopColor: Colors.dustWhite,
	},
	miningContainer: {
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	bottomContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: Sizes.smartVerticalScale(50),
		backgroundColor: Colors.tabBarBottomBg,
		alignItems: 'center',
	},
	saveButton: {
		flexDirection: 'row',
		alignItems: 'center',
		height: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	saveButtonText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	errorText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.monza,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	checkIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.green,
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	avatarPickerSize: Sizes.smartHorizontalScale(103),
	avatarFullNameColor: Colors.postFullName,
	avatarUserNameColor: Colors.postHour,
	aboutMeTextBorderColor: Colors.dustWhite,
	userDataInputIconColor: Colors.iron,
	userDataInputPlaceholderColor: Colors.postText,
	userDataInputBorderColor: Colors.transparent,
	avatarPlaceholderImg: Images.user_avatar_placeholder,
};
