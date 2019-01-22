import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(50);

export default StyleSheet.create({
	card: {
		backgroundColor: Colors.white,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(5),
	},
	removable: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	details: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
	},
	right: {
		flex: 1,
		paddingVertical: Sizes.smartVerticalScale(10),
		alignItems: 'flex-end',
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	textContainer: {
		paddingLeft: Sizes.smartHorizontalScale(15),
		justifyContent: 'center',
	},
	name: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		marginBottom: Sizes.smartVerticalScale(3),
	},
	message: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.gray,
	},
	alias: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.pink,
	},
	button: {
		flex: 1,
		backgroundColor: Colors.alabaster,
	},
	primary: {
		height: Sizes.smartVerticalScale(30),
		backgroundColor: Colors.pink,
	},
	secondary: {
		height: Sizes.smartVerticalScale(30),
		backgroundColor: Colors.white,
	},
	rightContainer: {
		flex: 1,
		maxWidth: Sizes.smartHorizontalScale(100),
		backgroundColor: Colors.ceriseRed,
		justifyContent: 'center',
		alignItems: 'center',
	},
	action: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(18),
		color: Colors.white,
	},
});
