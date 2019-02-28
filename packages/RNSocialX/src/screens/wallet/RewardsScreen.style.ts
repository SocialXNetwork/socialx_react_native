import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export const BARS_HEIGHT = 16;
export const CARD_WIDTH = 100;

const styles: any = {
	container: {
		flex: 1,
		height: '100%',
		width: '100%',
	},
	contentContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(18),
		paddingTop: Sizes.smartVerticalScale(20),
		backgroundColor: Colors.white,
	},
	segmentContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingVertical: Sizes.smartVerticalScale(19),
		backgroundColor: Colors.white,
	},
	segmentButtonDateActive: {
		width: '50%',
		justifyContent: 'center',
		backgroundColor: Colors.pink,
		borderColor: Colors.pink,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	segmentButtonDateInactive: {
		width: '50%',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		borderColor: Colors.pink,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	segmentTitleActive: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.white,
	},
	segmentTitleInactive: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.pink,
	},
	overviewContainer: {
		paddingTop: Sizes.smartVerticalScale(15),
	},
	overviewTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(23),
		color: Colors.cloudBurst,
		textAlign: 'left',
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	overviewItem: {
		flexDirection: 'column',
		paddingVertical: Sizes.smartVerticalScale(5),
	},
	itemDescription: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	abbreviationContainer: {
		flexDirection: 'row',
	},
	abbreviation: {
		width: Sizes.smartVerticalScale(55),
		height: Sizes.smartVerticalScale(20),
		borderRadius: Sizes.smartVerticalScale(10),
		marginRight: Sizes.smartHorizontalScale(10),
		backgroundColor: Colors.dustWhite,
		alignItems: 'center',
		justifyContent: 'center',
	},
	abbreviationShort: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.cloudBurst,
		fontWeight: 'bold',
	},
	abreviationText: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	itemBar: {
		flex: 1,
		borderRadius: Sizes.smartVerticalScale(10),
		backgroundColor: Colors.dustWhite,
		paddingVertical: Sizes.smartVerticalScale(BARS_HEIGHT / 2),
		marginBottom: Sizes.smartVerticalScale(10),
	},
	separator: {
		borderWidth: 1,
		borderColor: Colors.dustWhite,
		height: Sizes.smartVerticalScale(2),
	},
	totalAmountContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingVertical: Sizes.smartVerticalScale(15),
	},
	textAmount: {
		fontSize: Sizes.smartHorizontalScale(27),
		color: Colors.cloudBurst,
		paddingTop: Sizes.smartVerticalScale(8),
		fontWeight: 'bold',
	},
	grayText: {
		...Fonts.centuryGothic,
		color: Colors.paleSky,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	carousels: {
		flex: 1,
		backgroundColor: Colors.white,
		justifyContent: 'center',
	},
	animatedViewport: {
		overflow: 'hidden',
		zIndex: 1,
	},
	animatedView: {
		width: '200%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	fullWidth: {
		flex: 1,
		alignItems: 'center',
	},
	card: {
		height: '90%',
		borderColor: 'transparent',
		borderRadius: Sizes.smartVerticalScale(10),
		shadowColor: Colors.black,
		shadowRadius: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(8),
		paddingVertical: Sizes.smartVerticalScale(8),
	},
	cardDate: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(18),
	},
	cardAmount: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(30),
		fontWeight: 'bold',
	},
	cardCurrency: {
		...Fonts.centuryGothic,
		color: Colors.paleSky,
		fontSize: Sizes.smartHorizontalScale(12),
		fontWeight: 'bold',
	},
	backButtonContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(18),
		paddingVertical: Sizes.smartVerticalScale(18),
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		backgroundColor: Colors.white,
	},
};

export default StyleSheet.create(styles) as any;

export const customStyles = {
	referralsColor: Colors.pink,
	postsColor: Colors.blueRibbon,
	bountiesColor: Colors.green,
};
