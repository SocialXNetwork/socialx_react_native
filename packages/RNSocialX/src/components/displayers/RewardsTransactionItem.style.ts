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
		flex: 3,
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightContainer: {
		flex: 1,
		paddingRight: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
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
		color: Colors.cloudBurst,
	},
	greenText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(19),
		color: Colors.sushi,
		fontWeight: 'bold',
	},
	grayText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(19),
		color: Colors.shuttleGray,
	},
	grayTextBold: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(19),
		color: Colors.shuttleGray,
		fontWeight: 'bold',
	},
	pinkText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(19),
		color: Colors.pink,
		fontWeight: 'bold',
	},
	dot: {
		height: Sizes.smartVerticalScale(5),
		width: Sizes.smartHorizontalScale(5),
		backgroundColor: Colors.shuttleGray,
		borderRadius: Sizes.smartHorizontalScale(100),
		opacity: 0.6,
	},
	dateText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(19),
		color: Colors.shuttleGray,
		textAlign: 'center',
	},
};

export default StyleSheet.create(styles);
