import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export const CHART_ITEM_WIDTH = Math.round(Sizes.smartHorizontalScale(35));

const styles: any = {
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: Colors.wildSand,
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
		paddingLeft: Sizes.smartVerticalScale(24),
		paddingVertical: Sizes.smartVerticalScale(20),
		backgroundColor: 'white',
	},
	separator: {
		borderWidth: 1,
		borderColor: Colors.dustWhite,
		height: Sizes.smartVerticalScale(2),
	},
	header: {
		paddingVertical: Sizes.smartVerticalScale(15),
		paddingHorizontal: Sizes.smartHorizontalScale(24),
	},
	headerText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	transactionsContainer: {
		backgroundColor: Colors.white,
		marginTop: Sizes.smartVerticalScale(27),
	},
	transaction: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.dustWhite,
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingVertical: Sizes.smartVerticalScale(15),
	},
	moreTransactionsContainer: {
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(8),
	},
	moreTransactionsText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.pink,
	},
	text: {
		...Fonts.centuryGothic,
		color: Colors.paleSky,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	textAmount: {
		fontSize: Sizes.smartHorizontalScale(27),
		color: Colors.cloudBurst,
		paddingRight: Sizes.smartVerticalScale(8),
	},
	textDate: {
		...Fonts.centuryGothic,
		color: Colors.paleSky,
		fontSize: Sizes.smartHorizontalScale(12),
	},
	spentContainer: {
		backgroundColor: Colors.white,
		marginTop: Sizes.smartVerticalScale(27),
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(19),
		paddingHorizontal: Sizes.smartHorizontalScale(18),
	},
	segment: {
		width: '100%',
		height: '100%',
		backgroundColor: Colors.white,
	},
	segmentButtonSpentTillNowActive: {
		width: '50%',
		justifyContent: 'center',
		backgroundColor: Colors.pink,
		borderColor: Colors.pink,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	segmentButtonSpentTillNowInactive: {
		width: '50%',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		borderColor: Colors.pink,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	segmentTitleActive: {
		color: Colors.white,
	},
	segmentTitleInactive: {
		color: Colors.pink,
	},
	amountContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingBottom: Sizes.smartVerticalScale(15),
		paddingHorizontal: Sizes.smartHorizontalScale(18),
	},
	graphContainer: {
		flex: 1,
		minHeight: '100%',
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(18),
	},
	animatedViewport: {
		flex: 1,
		overflow: 'hidden',
		zIndex: 1,
	},
	animatedView: {
		flex: 1,
		width: '200%',
		flexDirection: 'row',
	},
	fullWidth: {
		flex: 1,
		width: '50%',
		minHeight: Sizes.smartVerticalScale(75),
		maxHeight: Sizes.smartHorizontalScale(150),
	},
	monthlyBarChartStyles: {
		flex: 1,
		justifyContent: 'space-between',
	},
};

export default StyleSheet.create(styles) as any;

export const defaultStyles = {
	highlightButton: Colors.pinkLace,
};
