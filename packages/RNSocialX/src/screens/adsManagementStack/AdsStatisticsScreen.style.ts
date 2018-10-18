import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

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
		color: Colors.postFullName,
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
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	textAmount: {
		fontSize: Sizes.smartHorizontalScale(27),
		color: Colors.postFullName,
		paddingRight: Sizes.smartVerticalScale(8),
	},
	textDate: {
		...Fonts.centuryGothic,
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(12),
	},
	spentContainer: {
		backgroundColor: Colors.white,
		marginTop: Sizes.smartVerticalScale(27),
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingVertical: Sizes.smartVerticalScale(19),
		paddingHorizontal: Sizes.smartHorizontalScale(18),
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: Sizes.smartHorizontalScale(35),
		width: Sizes.smartVerticalScale(100),
		borderWidth: 1,
		borderColor: Colors.pink,
		backgroundColor: Colors.pink,
		borderRadius: 32,
		fontSize: Sizes.smartHorizontalScale(14),
		marginRight: Sizes.smartVerticalScale(18),
	},
	buttonText: {
		color: Colors.white,
	},
	segment: {
		backgroundColor: Colors.white,
	},
	segmentButtonWeeklyActive: {
		backgroundColor: Colors.pink,
		borderColor: Colors.pink,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	segmentButtonWeeklyInactive: {
		backgroundColor: 'transparent',
		borderColor: Colors.pink,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	segmentButtonMonthlyActive: {
		backgroundColor: Colors.pink,
		borderColor: Colors.pink,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	segmentButtonMonthlyInactive: {
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
	graphContainer: {},
};

export default StyleSheet.create(styles) as any;

export const customStyleProps = {
	highlightButton: Colors.pinkLace,
};
