import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const BADGE_HEIGHT = Sizes.smartHorizontalScale(18);

const styles: any = {
	container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	badge: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: BADGE_HEIGHT,
		color: Colors.white,
	},
	background: {
		position: 'absolute',
		borderRadius: BADGE_HEIGHT / 2,
		minWidth: BADGE_HEIGHT,
		paddingHorizontal: 1,
		paddingBottom: 1,
		backgroundColor: Colors.red,
		alignItems: 'center',
		justifyContent: 'center',
		left: '55%',
		top: 2.5,
	},
};

export default StyleSheet.create(styles);
