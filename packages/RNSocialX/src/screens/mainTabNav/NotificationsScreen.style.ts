import {StyleSheet} from 'react-native';
import {Colors, Fonts, Icons, Sizes} from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	emptyContainer: {
		flex: 1, // TODO: this should take full width in RN 0.56
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Sizes.smartVerticalScale(30),
	},
	noNotificationsScrollContainer: {
		flex: 1,
	},
	noNotificationsText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(24),
		textAlign: 'center',
		color: Colors.silverSand,
	},
	noNotificationsIcon: {
		width: Sizes.smartHorizontalScale(37),
		height: Sizes.smartHorizontalScale(33),
		marginBottom: Sizes.smartVerticalScale(15),
	},
};

export default StyleSheet.create(styles);
export const emptyListIcon = Icons.iconNotificationsScreenEmpty;
