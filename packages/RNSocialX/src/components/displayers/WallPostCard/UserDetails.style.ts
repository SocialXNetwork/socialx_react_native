import { StyleSheet } from 'react-native';
import { Colors, Fonts, Images, Sizes } from '../../../environment/theme';

const SIDE_PADDING = Sizes.smartHorizontalScale(16);

const styles: any = {
	container: {
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
	details: {
		flex: 6,
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
	dotsContainer: {
		flex: 1,
		alignItems: 'center',
	},
};

export default StyleSheet.create(styles);
export const images = Images;
export const defaultStyles = {
	advancedMenuButtonColor: Colors.postFullName,
};
