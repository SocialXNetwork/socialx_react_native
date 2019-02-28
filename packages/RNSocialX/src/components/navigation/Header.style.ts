import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';
const AVATAR_SIZE = Sizes.smartHorizontalScale(35);

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.pink,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: Sizes.smartVerticalScale(45),
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
	avatar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	backArrow: {
		marginRight: Sizes.smartHorizontalScale(15),
	},
});
