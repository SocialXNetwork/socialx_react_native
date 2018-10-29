import { StyleSheet } from 'react-native';
import { Colors, colorWithAlpha, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	mediaInfoSection: {
		width: '100%',
		paddingBottom: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		flexDirection: 'row',
	},
	infoText: {
		...Fonts.centuryGothic,
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(16),
	},
	actionButtons: {
		flex: 1,
		paddingTop: Sizes.smartVerticalScale(5),
		marginHorizontal: Sizes.smartHorizontalScale(10),
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopColor: colorWithAlpha(Colors.white, 0.5),
		borderTopWidth: Sizes.smartVerticalScale(1),
	},
	iconStyle: {
		fontSize: Sizes.smartHorizontalScale(25),
		color: Colors.white,
	},
	textStyle: {
		color: Colors.white,
	},
};

export default StyleSheet.create(styles);
