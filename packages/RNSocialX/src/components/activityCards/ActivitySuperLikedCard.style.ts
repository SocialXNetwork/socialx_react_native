import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
		paddingLeft: Sizes.smartHorizontalScale(25),
		paddingVertical: Sizes.smartVerticalScale(24),
		borderBottomColor: Colors.activityCardBottomBorder,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
	},
	avatarImage: {
		width: Sizes.smartHorizontalScale(64),
		height: Sizes.smartHorizontalScale(64),
		borderRadius: Sizes.smartHorizontalScale(64) / 2,
		marginRight: Sizes.smartHorizontalScale(25),
	},
	rightContainer: {
		flex: 1,
	},
	topRightRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: Sizes.smartVerticalScale(6),
	},
	notificationTimestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.pigeonPost,
		paddingRight: Sizes.smartHorizontalScale(6),
	},
	fullName: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	activityActionText: {
		...Fonts.centuryGothic,
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(23),
		paddingRight: Sizes.smartHorizontalScale(6),
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	pinkText: {
		color: Colors.pink,
	},
	wallPostsThumbsContainer: {
		flexDirection: 'row',
	},
	postThumbTouchContainer: {
		width: Sizes.smartHorizontalScale(66),
		height: Sizes.smartHorizontalScale(66),
		marginRight: Sizes.smartHorizontalScale(17),
	},
	postThumbImage: {
		width: '100%',
		height: '100%',
		borderRadius: Sizes.smartHorizontalScale(9),
	},
};

export default StyleSheet.create(style);
