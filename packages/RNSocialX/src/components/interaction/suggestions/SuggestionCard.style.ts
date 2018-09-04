import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(90);

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.wildSand,
		borderWidth: 0.5,
		borderColor: Colors.dustWhite,
		borderRadius: Sizes.smartHorizontalScale(5),
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(15),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		marginHorizontal: Sizes.smartHorizontalScale(5),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
	},
	name: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(18),
		paddingTop: Sizes.smartVerticalScale(10),
		paddingBottom: Sizes.smartVerticalScale(5),
		textAlign: 'center',
	},
	reason: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		paddingBottom: Sizes.smartVerticalScale(10),
		textAlign: 'center',
	},
	buttonContainer: {
		height: Sizes.smartVerticalScale(30),
		borderRadius: Sizes.smartHorizontalScale(4),
		backgroundColor: Colors.pink,
	},
	iconContainer: {
		position: 'absolute',
		top: -5,
		right: 0,
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(35),
		color: Colors.grayText,
	},
};

export default StyleSheet.create(styles);
export const colors = {pink: Colors.pink, white: Colors.white};
