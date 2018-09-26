import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	likesContainer: {
		position: 'absolute',
		zIndex: 1,
		elevation: 3,
	},
	likesBorder: {
		flexDirection: 'row',
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartHorizontalScale(15),
		borderColor: Colors.dustWhite,
		borderWidth: 1,
		paddingLeft: Sizes.smartHorizontalScale(4),
		paddingRight: Sizes.smartHorizontalScale(2),
		paddingVertical: Sizes.smartVerticalScale(2),
		alignItems: 'center',
	},
	numberOfLikes: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		paddingLeft: Sizes.smartHorizontalScale(2),
	},
	iconContainer: {
		backgroundColor: Colors.pink,
		borderRadius: Sizes.smartHorizontalScale(50),
		paddingVertical: Sizes.smartHorizontalScale(1),
		paddingHorizontal: Sizes.smartHorizontalScale(4),
	},
	icon: {
		width: Sizes.smartHorizontalScale(16),
		height: Sizes.smartHorizontalScale(16),
		color: Colors.white,
	},
};

export default StyleSheet.create(styles);
