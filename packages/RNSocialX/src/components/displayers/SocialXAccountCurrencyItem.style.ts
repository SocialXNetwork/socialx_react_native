import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const CURRENCY_ICON_SIZE = Sizes.smartHorizontalScale(40);

const styles: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	centerContainer: {
		width: Sizes.smartHorizontalScale(100),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	lineChart: {
		width: Sizes.smartHorizontalScale(70),
		height: Sizes.smartHorizontalScale(40),
	},
	coinIcon: {
		width: CURRENCY_ICON_SIZE,
		height: CURRENCY_ICON_SIZE,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	coinFullName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
	},
	usdValue: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(18),
		color: Colors.shuttleGray,
	},
	coinAmount: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.shuttleGray,
		opacity: 0.6,
		marginTop: Sizes.smartHorizontalScale(2),
	},
	trendContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	trendPercentage: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.sushi,
		marginTop: Sizes.smartHorizontalScale(2),
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	trendGoingDown: {
		color: Colors.ceriseRed,
	},
};

export default StyleSheet.create(styles);
export const customStyles = {
	negPercentage: Colors.ceriseRed,
	pozPercentage: Colors.sushi,
	iconSize: Sizes.smartHorizontalScale(15),
};
