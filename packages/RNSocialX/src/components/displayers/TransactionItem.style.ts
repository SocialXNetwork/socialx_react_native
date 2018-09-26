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
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightContainer: {
		paddingRight: Sizes.smartHorizontalScale(10),
	},
	coinIconLoader: {
		width: COIN_ICON_SIZE,
		height: COIN_ICON_SIZE,
		borderRadius: COIN_ICON_SIZE / 2,
		marginVertical: Sizes.smartVerticalScale(15),
		marginRight: Sizes.smartHorizontalScale(9),
		overflow: 'hidden',
	},
	coinIcon: {
		marginVertical: Sizes.smartVerticalScale(15),
		marginRight: Sizes.smartHorizontalScale(9),
		width: COIN_ICON_SIZE,
		height: COIN_ICON_SIZE,
	},
	lineTextFirstLoader: {
		height: Sizes.smartHorizontalScale(20),
		width: Sizes.smartHorizontalScale(130),
		marginVertical: Sizes.smartHorizontalScale(7),
	},
	lineTextSecondLoader: {
		height: Sizes.smartHorizontalScale(20),
		width: Sizes.smartHorizontalScale(100),
		marginVertical: Sizes.smartHorizontalScale(7),
	},
	lineText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(35),
		color: Colors.postFullName,
	},
	grayText: {
		color: Colors.shuttleGray,
		opacity: 0.4,
	},
	dateTextLoader: {
		width: Sizes.smartHorizontalScale(35),
		height: Sizes.smartHorizontalScale(16),
		marginBottom: Sizes.smartHorizontalScale(4),
	},
	dateText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.shuttleGray,
		opacity: 0.6,
	},
};

export default StyleSheet.create(styles);
