import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(50);

const styles: any = {
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: Sizes.smartVerticalScale(5),
	},
	details: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
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
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.grayText,
	},
	userName: {
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
};

export default StyleSheet.create(styles);
