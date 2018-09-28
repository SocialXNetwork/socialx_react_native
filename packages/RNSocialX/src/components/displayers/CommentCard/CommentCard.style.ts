import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(40);
export const DROPDOWN_ITEM_HEIGHT = Sizes.smartHorizontalScale(35);

const styles: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
		paddingVertical: Sizes.smartVerticalScale(5),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		justifyContent: 'flex-start',
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	rightContainer: {
		flex: 0,
		flexShrink: 1,
		paddingLeft: Sizes.smartHorizontalScale(10),
	},
	commentBackground: {
		borderRadius: Sizes.smartHorizontalScale(20),
		backgroundColor: Colors.gallery,
		paddingHorizontal: Sizes.smartHorizontalScale(12),
		paddingTop: Sizes.smartHorizontalScale(8),
	},
	userFullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
		alignSelf: 'flex-start',
		marginBottom: Sizes.smartVerticalScale(2),
	},
	commentText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
		paddingBottom: Sizes.smartHorizontalScale(8),
	},
	actionsContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
		lineHeight: Sizes.smartHorizontalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	actionButtonText: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
		lineHeight: Sizes.smartHorizontalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	dropDownStyle: {
		borderWidth: Sizes.smartHorizontalScale(1),
		borderRadius: Sizes.smartHorizontalScale(5),
		backgroundColor: Colors.iron,
	},
	commentOption: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
		lineHeight: DROPDOWN_ITEM_HEIGHT,
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
};

export default StyleSheet.create(styles);
