import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const ICON_SIZE = Sizes.smartHorizontalScale(20);

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
	managementContainer: {
		marginTop: Sizes.smartHorizontalScale(29),
		backgroundColor: Colors.white,
		width: '100%',
		height: Sizes.smartHorizontalScale(172),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingVertical: Sizes.smartVerticalScale(15),
	},
	adDirectoryContainer: {
		flexDirection: 'column',
		paddingBottom: Sizes.smartHorizontalScale(18),
	},
	iconsAndTitleAdDirectory: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: Sizes.smartHorizontalScale(10),
	},
	iconsAndTitleBudget: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	icon: {
		paddingRight: Sizes.smartHorizontalScale(10),
		fontSize: ICON_SIZE,
		color: Colors.pink,
	},
	adDirectoryTextContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	adText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		backgroundColor: Colors.white,
	},
	editIcon: {
		fontSize: ICON_SIZE,
		color: Colors.pink,
	},
	adNumberTextContainer: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	linesContainer: {
		position: 'absolute',
		bottom: Sizes.smartVerticalScale(Math.round(ICON_SIZE / 2.5)),
		left: Sizes.smartHorizontalScale(Math.round(ICON_SIZE / 3)),
	},
	verticalLine: {
		borderLeftColor: Colors.paleSky,
		borderLeftWidth: 1,
		width: Sizes.smartVerticalScale(2),
		height: Sizes.smartHorizontalScale(24),
	},
	horizontalLine: {
		borderBottomColor: Colors.paleSky,
		borderBottomWidth: 1,
		width: Sizes.smartVerticalScale(12),
		height: Sizes.smartHorizontalScale(2),
	},
	adNumberIcon: {
		fontSize: ICON_SIZE,
		color: Colors.pink,
		paddingLeft: Sizes.smartHorizontalScale(ICON_SIZE + 5),
		paddingRight: Sizes.smartHorizontalScale(10),
	},
	budgetContainer: {
		flex: 1,
		flexDirection: 'column',
	},
	budgetText: {
		flex: 1,
		alignItems: 'flex-start',
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		backgroundColor: Colors.white,
	},
	dateAndAmount: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
		color: Colors.paleSky,
		backgroundColor: Colors.white,
		paddingLeft: Sizes.smartVerticalScale(24),
		paddingBottom: Sizes.smartHorizontalScale(5),
	},
	adName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
	},
	buttonsContainer: {
		marginTop: Sizes.smartHorizontalScale(29),
		backgroundColor: Colors.white,
	},
	previewContainer: {
		backgroundColor: Colors.white,
		marginTop: Sizes.smartVerticalScale(29),
	},
};

export default StyleSheet.create(styles) as any;

export const defaultStyles = {};
