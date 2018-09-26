import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const styles: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		marginVertical: Sizes.smartVerticalScale(15),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	arrow: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.black,
		paddingRight: Sizes.smartHorizontalScale(20),
	},
	textContainer: {
		height: '100%',
		paddingLeft: Sizes.smartHorizontalScale(20),
	},
	user: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postFullName,
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(3),
	},
	dotsContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
};

export default StyleSheet.create(styles);
