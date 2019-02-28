import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(40);

export default StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		paddingVertical: Sizes.smartVerticalScale(7.5),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
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
		borderRadius: Sizes.smartHorizontalScale(15),
		backgroundColor: Colors.gallery,
		paddingHorizontal: Sizes.smartHorizontalScale(12),
		paddingVertical: Sizes.smartVerticalScale(7),
	},
	userFullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.cloudBurst,
		marginBottom: Sizes.smartVerticalScale(1),
	},
	commentText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
	},
	actionsContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
		lineHeight: Sizes.smartHorizontalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	actionButtonText: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
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
		color: Colors.cloudBurst,
		lineHeight: Sizes.smartHorizontalScale(35),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
	hashtag: {
		...Fonts.centuryGothicBold,
	},
	tag: {
		color: Colors.pink,
	},
	url: {
		color: Colors.pink,
	},
});
