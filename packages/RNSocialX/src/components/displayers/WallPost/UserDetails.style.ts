import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const SIDE_PADDING = Sizes.smartHorizontalScale(16);
const AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const styles: any = {
	container: {
		flexDirection: 'row',
		paddingHorizontal: SIDE_PADDING,
		paddingBottom: SIDE_PADDING,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	arrow: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.black,
		paddingRight: Sizes.smartHorizontalScale(20),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	details: {
		justifyContent: 'center',
	},
	fullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.cloudBurst,
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
		paddingTop: Sizes.smartVerticalScale(3),
	},
	options: {
		flex: 1,
		justifyContent: 'flex-end',
	},
};

export default StyleSheet.create(styles);
