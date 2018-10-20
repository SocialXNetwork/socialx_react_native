import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const HORIZONTAL_PADDING = Sizes.smartHorizontalScale(23);
const ICON_SIZE = Sizes.smartHorizontalScale(35);

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	icon: {
		fontSize: ICON_SIZE,
		color: Colors.white,
	},
	content: {
		flex: 1,
		backgroundColor: Colors.wildSand,
	},
	currentDate: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.cloudBurst,
		width: '100%',
		textAlign: 'center',
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	section: {
		borderTopWidth: Sizes.smartHorizontalScale(0.5),
		borderBottomWidth: Sizes.smartHorizontalScale(0.5),
		borderColor: Colors.dustWhite,
		marginBottom: Sizes.smartVerticalScale(15),
	},
	heading: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
		backgroundColor: Colors.white,
		paddingHorizontal: HORIZONTAL_PADDING,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	card: {
		backgroundColor: Colors.white,
		paddingTop: Sizes.smartVerticalScale(15),
		paddingBottom: Sizes.smartVerticalScale(20),
		paddingHorizontal: HORIZONTAL_PADDING,
		borderTopColor: Colors.dustWhite,
		borderTopWidth: Sizes.smartHorizontalScale(0.5),
	},
	cardHeader: {
		flexDirection: 'row',
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(16),
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.cloudBurst,
		flex: 1,
	},
	description: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.paleSky,
	},
	editIcon: {
		color: Colors.paleSky,
		fontSize: Sizes.smartHorizontalScale(20),
	},
	image: {
		width: '100%',
		height: Sizes.smartVerticalScale(184),
	},
	headingContainer: {
		borderBottomColor: Colors.dustWhite,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
	},
	activeTab: {
		height: Sizes.smartVerticalScale(1),
		backgroundColor: Colors.pink,
	},
	tab: {
		backgroundColor: Colors.white,
	},
	tabText: {
		...Fonts.centuryGothic,
		color: Colors.background,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	activeTabText: {
		...Fonts.centuryGothic,
		color: Colors.pink,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	button: {
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: Sizes.smartVerticalScale(10),
		paddingBottom: Sizes.smartVerticalScale(20),
	},
};

export default StyleSheet.create(style) as any;
export const BUTTON_WIDTH = Sizes.smartHorizontalScale(250);
