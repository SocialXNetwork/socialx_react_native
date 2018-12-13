import { StyleSheet } from 'react-native';
import { Colors, Fonts, Icons, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	list: {
		paddingVertical: Sizes.smartVerticalScale(16),
		paddingHorizontal: Sizes.smartHorizontalScale(25),
	},
	empty: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Sizes.smartVerticalScale(30),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(24),
		textAlign: 'center',
		color: Colors.silverSand,
	},
	icon: {
		width: Sizes.smartHorizontalScale(37),
		height: Sizes.smartHorizontalScale(33),
		marginBottom: Sizes.smartVerticalScale(15),
	},
};

export default StyleSheet.create(styles);
export const Icon = Icons.iconNotificationsScreenEmpty;
