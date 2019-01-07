import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const COIN_ICON_SIZE = Sizes.smartHorizontalScale(50);

const styles: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: Sizes.smartHorizontalScale(2),
		borderBottomColor: Colors.grayNurse05,
	},
	leftContainer: {
		flex: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightContainer: {
		flex: 1,
		paddingRight: Sizes.smartHorizontalScale(10),
	},
	coinIcon: {
		marginVertical: Sizes.smartVerticalScale(15),
		marginRight: Sizes.smartHorizontalScale(9),
		width: COIN_ICON_SIZE,
		height: COIN_ICON_SIZE,
	},
	lineText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(29),
		color: Colors.cloudBurst,
	},
	grayText: {
		color: Colors.shuttleGray,
		opacity: 0.4,
	},
	dateText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.shuttleGray,
		opacity: 0.6,
		textAlign: 'center',
	},
};

export default StyleSheet.create(styles);
