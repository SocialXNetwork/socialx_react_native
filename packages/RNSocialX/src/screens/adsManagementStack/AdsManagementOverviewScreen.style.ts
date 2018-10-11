import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const ADD_BUTTON_SIZE = Sizes.smartHorizontalScale(50);
const HORIZONTAL_PADDING = Sizes.smartHorizontalScale(23);

const style: any = {
	rootView: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	contentView: {
		flex: 1,
		backgroundColor: Colors.wildSand,
	},
	currentDate: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postFullName,
		width: '100%',
		textAlign: 'center',
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	adsListTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
		backgroundColor: Colors.white,
		paddingHorizontal: HORIZONTAL_PADDING,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	createAdButtonContainer: {
		width: ADD_BUTTON_SIZE,
		height: ADD_BUTTON_SIZE,
		borderRadius: ADD_BUTTON_SIZE / 2,
		backgroundColor: Colors.postHour,
		position: 'absolute',
		bottom: Sizes.smartHorizontalScale(10),
		right: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
	},
	createAdButtonIcon: {
		fontSize: Sizes.smartHorizontalScale(50),
		color: Colors.white,
	},
	adCardContainer: {
		backgroundColor: Colors.white,
		paddingTop: Sizes.smartVerticalScale(15),
		paddingBottom: Sizes.smartVerticalScale(20),
		paddingHorizontal: HORIZONTAL_PADDING,
		borderTopColor: Colors.dustWhite,
		borderTopWidth: Sizes.smartHorizontalScale(1),
	},
	adCardTitleRow: {
		flexDirection: 'row',
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(15),
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	adCardTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
		flex: 1,
	},
	adCardDescription: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postText,
	},
	editAdIcon: {
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(20),
	},
	adCardThumbnail: {
		width: '100%',
		height: Sizes.smartVerticalScale(184),
	},
	accountPerformanceTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
		paddingVertical: Sizes.smartVerticalScale(9),
		backgroundColor: Colors.white,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	accountPerformanceTitleBorder: {
		borderBottomColor: Colors.dustWhite,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
	},
	performanceContainer: {
		backgroundColor: Colors.white,
		marginTop: Sizes.smartVerticalScale(30),
	},
	tabBarUnderlineStyle: {
		height: Sizes.smartVerticalScale(1),
		backgroundColor: Colors.pink,
	},
	tabStyle: {
		backgroundColor: Colors.white,
	},
	tabTitleTextInactive: {
		...Fonts.centuryGothic,
		color: Colors.background,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	tabTitleTextActive: {
		...Fonts.centuryGothic,
		color: Colors.pink,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	seePastPerformanceButton: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.postHour,
		width: '100%',
		textAlign: 'center',
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	seePastPerformanceContainer: {
		marginBottom: Sizes.smartVerticalScale(30),
		backgroundColor: Colors.white,
	},
};

export default StyleSheet.create(style) as any;
