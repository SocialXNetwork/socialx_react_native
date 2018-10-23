import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const SCREEN_HORIZONTAL_PADDING = Sizes.smartHorizontalScale(24);

const style: any = {
	rootView: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	headerText: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(15),
		paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	screenContent: {
		borderTopWidth: Sizes.smartVerticalScale(2),
		borderTopColor: Colors.dustWhite,
		paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	segmentTitleActive: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		color: Colors.white,
	},
	segmentTitleInactive: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		color: Colors.pink,
	},
	ageSelectorTrack: {
		backgroundColor: Colors.pink,
	},
	ageSelectorContainer: {
		alignItems: 'center',
	},
	thumbContainer: {
		backgroundColor: Colors.white,
		borderColor: Colors.paleSky,
		borderWidth: Sizes.smartHorizontalScale(2),
		padding: Sizes.smartHorizontalScale(3),
	},
};

export default StyleSheet.create(style);

export const nativeBaseStyles = {
	segment: {
		backgroundColor: Colors.white,
	},
	segmentButtonActive: {
		backgroundColor: Colors.pink,
		borderColor: Colors.pink,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	segmentButtonInactive: {
		backgroundColor: Colors.transparent,
		borderColor: Colors.pink,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
};
