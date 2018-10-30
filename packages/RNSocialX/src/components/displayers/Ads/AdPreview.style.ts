import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const HORIZONTAL_PADDING = Sizes.smartHorizontalScale(23);

const style: any = {
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
};

export default StyleSheet.create(style) as any;
