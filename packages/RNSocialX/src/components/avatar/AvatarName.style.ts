import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		height: Sizes.smartHorizontalScale(60),
		paddingVertical: Sizes.smartVerticalScale(10),
		justifyContent: 'space-between',
	},
	fullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		textAlign: 'center',
		color: Colors.cloudBurst,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	userName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(20),
		textAlign: 'center',
		color: Colors.pink,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
};

export default StyleSheet.create(style);
