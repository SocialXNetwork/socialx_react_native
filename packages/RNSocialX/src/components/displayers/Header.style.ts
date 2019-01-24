import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(30);

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.pink,
		height: Sizes.smartVerticalScale(45),
		justifyContent: 'center',
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartVerticalScale(16),
	},
	left: {
		flex: 1,
		justifyContent: 'center',
	},
	center: {
		flex: 3,
		justifyContent: 'center',
	},
	right: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	avatarContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// marginLeft: Sizes.smartHorizontalScale(10),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.white,
		letterSpacing: Sizes.smartVerticalScale(2),
		lineHeight: Sizes.smartVerticalScale(16),
		textAlign: 'center',
	},
	placeholder: {
		flex: 1,
	},
});
