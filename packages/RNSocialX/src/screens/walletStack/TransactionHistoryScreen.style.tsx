import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export const TRANSACTION_BUTTON_WIDTH = Sizes.smartHorizontalScale(150);

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.wildSand,
	},
	overviewContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(30),
		paddingVertical: Sizes.smartVerticalScale(20),
		backgroundColor: Colors.white,
		marginBottom: Sizes.smartVerticalScale(20),
	},
	balance: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.cloudBurst,
		letterSpacing: Sizes.smartVerticalScale(2),
	},
	coinContainer: {
		paddingVertical: Sizes.smartVerticalScale(10),
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	coins: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	coinValue: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(30),
		lineHeight: Sizes.smartHorizontalScale(33),
		color: Colors.cloudBurst,
		fontWeight: 'bold',
	},
	currency: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(18),
		lineHeight: Sizes.smartHorizontalScale(21),
		color: Colors.cloudBurst,
		fontWeight: 'bold',
		paddingLeft: Sizes.smartHorizontalScale(5),
		marginBottom: Sizes.smartVerticalScale(2),
	},
	accountButton: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		textTransform: 'capitalize',
		color: Colors.pink,
		fontWeight: 'bold',
		marginBottom: Sizes.smartVerticalScale(2),
	},
	buttonsContainer: {
		marginTop: Sizes.smartVerticalScale(10),
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button: {
		height: Sizes.smartVerticalScale(40),
		borderRadius: Sizes.smartHorizontalScale(100),
		marginHorizontal: Sizes.smartHorizontalScale(20),
	},
	activity: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.cloudBurst,
		letterSpacing: Sizes.smartVerticalScale(2),
		paddingLeft: Sizes.smartHorizontalScale(30),
	},
	transactionsContainer: {
		flex: 1,
		backgroundColor: Colors.white,
		marginTop: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
};

export default StyleSheet.create(styles);
