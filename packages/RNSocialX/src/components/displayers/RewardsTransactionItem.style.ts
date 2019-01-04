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
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightContainer: {
		flex: 2,
		paddingRight: Sizes.smartHorizontalScale(10),
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	coinIcon: {
		marginVertical: Sizes.smartVerticalScale(15),
		marginRight: Sizes.smartHorizontalScale(9),
		width: COIN_ICON_SIZE,
		height: COIN_ICON_SIZE,
	},
	descriptionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	lineText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(18),
		lineHeight: Sizes.smartHorizontalScale(27),
		color: Colors.charade,
	},
	greenText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(19),
		color: Colors.sushi,
		fontWeight: 'bold',
	},
	grayTextWithoutPadding: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.shuttleGray,
	},
	grayTextWithPadding: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.shuttleGray,
		paddingHorizontal: Sizes.smartHorizontalScale(3),
	},
	grayTextBold: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.shuttleGray,
		fontWeight: 'bold',
	},
	firstCoinGrayText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(19),
		color: Colors.shuttleGray,
		fontWeight: 'bold',
	},
	secondCoinGrayText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.shuttleGray,
		opacity: 0.8,
		textAlign: 'right',
	},
	pinkText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.pink,
		fontWeight: 'bold',
	},
	dot: {
		height: Sizes.smartVerticalScale(5),
		width: Sizes.smartHorizontalScale(5),
		backgroundColor: Colors.shuttleGray,
		borderRadius: Sizes.smartHorizontalScale(100),
		opacity: 0.6,
		marginHorizontal: Sizes.smartHorizontalScale(5),
	},
	dateText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.shuttleGray,
		textAlign: 'center',
	},
};

export default StyleSheet.create(styles);
