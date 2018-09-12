import {StyleSheet} from 'react-native';
import {Colors, Images, Sizes} from '../../../environment/theme';

export const SHARE_SECTION_HEIGHT = Sizes.smartVerticalScale(80);
export const USER_PLACEHOLDER_AVATAR = Images.user_avatar_placeholder;

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	wallPostContainer: {
		paddingTop: Sizes.smartVerticalScale(25),
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(8),
	},
};

export default StyleSheet.create(styles);
