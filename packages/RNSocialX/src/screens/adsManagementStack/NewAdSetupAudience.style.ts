import { Item } from 'native-base';
import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const SCREEN_HORIZONTAL_PADDING = Sizes.smartHorizontalScale(24);
export const SLIDER_LENGTH = Sizes.smartHorizontalScale(240);

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
	ageRangeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	ageRangeText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.cloudBurst,
	},
	ageSelectorTrack: {
		backgroundColor: Colors.pink,
	},
	ageSelectorContainer: {
		flex: 1,
		width: '50%',
		alignItems: 'center',
	},
	sectionLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.cloudBurst,
		marginVertical: Sizes.smartVerticalScale(10),
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
