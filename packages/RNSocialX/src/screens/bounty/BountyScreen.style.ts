import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const CURRENCY_ICON_SIZE = Sizes.smartHorizontalScale(50);

export default StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: Colors.white,
	},
	row: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		alignItems: 'center',
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(30),
		fontWeight: 'bold',
		marginVertical: Sizes.smartHorizontalScale(10),
	},
	dot: {
		height: Sizes.smartVerticalScale(10),
		width: Sizes.smartHorizontalScale(10),
		borderRadius: Sizes.smartHorizontalScale(100),
	},
	textIcon: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.black,
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	amountContainer: {
		flexDirection: 'column',
		backgroundColor: Colors.catskillWhite,
		marginTop: Sizes.smartHorizontalScale(15),
	},
	coinIcon: {
		width: CURRENCY_ICON_SIZE,
		height: CURRENCY_ICON_SIZE,
		marginVertical: Sizes.smartHorizontalScale(10),
	},
	spacer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	coinDetails: {
		flexDirection: 'column',
		marginLeft: Sizes.smartHorizontalScale(10),
	},
	amount: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(25),
		color: Colors.pink,
		fontWeight: 'bold',
	},
} as any);
