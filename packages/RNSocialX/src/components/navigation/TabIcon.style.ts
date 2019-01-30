import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const BADGE_HEIGHT = Sizes.smartHorizontalScale(18);
const ICON_SIZE = Sizes.smartHorizontalScale(25);

export default StyleSheet.create({
	container: {
		width: '20%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
	badge: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.white,
	},
	background: {
		position: 'absolute',
		borderRadius: BADGE_HEIGHT / 2,
		minWidth: BADGE_HEIGHT,
		minHeight: BADGE_HEIGHT,
		backgroundColor: Colors.red,
		alignItems: 'center',
		justifyContent: 'center',
		top: -5,
		left: 7.5,
	},
});
