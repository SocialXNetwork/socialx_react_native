import {StyleSheet} from 'react-native';

import {Colors, Fonts, Icons, Sizes} from '../../environment/theme';

const ICON_SIZE = Sizes.smartHorizontalScale(25);
const BUTTON_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: Sizes.smartHorizontalScale(25),
		paddingRight: Sizes.smartHorizontalScale(12),
		paddingVertical: Sizes.smartVerticalScale(24),
		borderBottomColor: Colors.activityCardBottomBorder,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	avatarImage: {
		width: Sizes.smartHorizontalScale(64),
		height: Sizes.smartHorizontalScale(64),
		borderRadius: Sizes.smartHorizontalScale(64) / 2,
		marginRight: Sizes.smartHorizontalScale(25),
	},
	avatarNameContainer: {
		flex: 1,
	},
	fullName: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	userName: {
		...Fonts.centuryGothic,
		color: Colors.postHour,
		fontSize: Sizes.smartHorizontalScale(11),
	},
	friendRequest: {
		...Fonts.centuryGothic,
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(23),
		paddingTop: Sizes.smartVerticalScale(3),
	},
	iconTouch: {
		width: BUTTON_SIZE,
		height: BUTTON_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: Sizes.smartHorizontalScale(15),
	},
	iconImage: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	iconRequestConfirmed: Icons.greenRoundCheck,
	iconRequestDeclined: Icons.redRoundCross,
};
