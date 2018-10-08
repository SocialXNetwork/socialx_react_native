import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(100);

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	avatarContainer: {
		width: '100%',
		alignItems: 'center',
		marginTop: Sizes.smartVerticalScale(20),
		marginBottom: Sizes.smartVerticalScale(10),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	name: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.postFullName,
		textAlign: 'center',
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	userName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.pink,
		textAlign: 'center',
		paddingBottom: Sizes.smartVerticalScale(15),
	},
	separator: {
		width: '100%',
		backgroundColor: Colors.wildSand,
		height: Sizes.smartVerticalScale(10),
	},
	button: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.wildSand,
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(styles);
