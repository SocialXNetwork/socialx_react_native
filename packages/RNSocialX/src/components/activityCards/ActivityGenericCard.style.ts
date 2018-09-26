import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		borderBottomColor: Colors.activityCardBottomBorder,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
	},
	swipeContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: Sizes.smartHorizontalScale(25),
		paddingRight: Sizes.smartHorizontalScale(12),
		paddingVertical: Sizes.smartVerticalScale(24),
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: Sizes.smartHorizontalScale(10),
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
	iconButton: {
		fontSize: Sizes.smartHorizontalScale(22),
		color: Colors.tundora,
		padding: Sizes.smartHorizontalScale(5),
	},
	leftSwipeContainer: {
		backgroundColor: Colors.red,
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	leftText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
};

export default StyleSheet.create(style);
