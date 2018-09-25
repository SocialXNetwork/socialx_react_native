import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../environment/theme';

const SIDE_PADDING = Sizes.smartHorizontalScale(16);

const styles: any = {
	topContainer: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
		paddingBottom: Sizes.smartHorizontalScale(14),
		justifyContent: 'space-between',
	},
	smallAvatarImage: {
		width: Sizes.smartHorizontalScale(40),
		height: Sizes.smartHorizontalScale(40),
		borderRadius: Sizes.smartHorizontalScale(40) / 2,
	},
	topRightContainer: {
		flex: 1,
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		justifyContent: 'center',
	},
	fullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postFullName,
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(3),
	},
};

export default StyleSheet.create(styles);

export const customStyleProps = {
	advancedMenuButtonColor: Colors.postFullName,
};
