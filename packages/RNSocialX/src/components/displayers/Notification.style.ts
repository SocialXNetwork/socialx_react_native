import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		borderBottomColor: Colors.activityCardBottomBorder,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
	},
	contentContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: Sizes.smartHorizontalScale(25),
		paddingRight: Sizes.smartHorizontalScale(12),
		paddingVertical: Sizes.smartVerticalScale(24),
	},
	row: {
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
	fullName: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	userName: {
		...Fonts.centuryGothic,
		color: Colors.pink,
		fontSize: Sizes.smartHorizontalScale(12),
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	text: {
		...Fonts.centuryGothic,
		color: Colors.paleSky,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(23),
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.pigeonPost,
		paddingTop: Sizes.smartVerticalScale(5),
	},
	button: {
		height: Sizes.smartVerticalScale(30),
		backgroundColor: Colors.pink,
		marginHorizontal: Sizes.smartHorizontalScale(10),
		marginBottom: Sizes.smartVerticalScale(10),
	},
	ghostButton: {
		height: Sizes.smartVerticalScale(30),
		backgroundColor: Colors.white,
		marginHorizontal: Sizes.smartHorizontalScale(10),
	},
};

export const buttonWidth = Sizes.smartHorizontalScale(110);
export const colors = {
	white: Colors.white,
	pink: Colors.pink,
	transparent: Colors.transparent,
};
export default StyleSheet.create(styles);
