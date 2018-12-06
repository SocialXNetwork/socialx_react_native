import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const USER_AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const styles: any = {
	container: {
		width: '100%',
		height: Sizes.smartVerticalScale(80),
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(8),
	},
	avatar: {
		width: USER_AVATAR_SIZE,
		height: USER_AVATAR_SIZE,
		borderRadius: USER_AVATAR_SIZE / 2,
	},
	messageContainer: {
		width: '100%',
	},
	message: {
		...Fonts.centuryGothic,
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.paleSky,
		paddingHorizontal: Sizes.smartHorizontalScale(13),
	},
};

export default StyleSheet.create(styles);
