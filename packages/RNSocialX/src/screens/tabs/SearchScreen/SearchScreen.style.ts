import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
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
	comingSoonContainer: {
		paddingTop: Sizes.smartVerticalScale(100),
		paddingHorizontal: Sizes.smartHorizontalScale(30),
		alignItems: 'center',
	},
	comingSoonText: {
		...Fonts.centuryGothic,
		color: Colors.grayText,
		fontSize: Sizes.smartHorizontalScale(16),
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
	},
	comingSoonIcon: {
		fontSize: Sizes.smartVerticalScale(72),
		color: Colors.paleSky,
	},
};

export default StyleSheet.create(styles) as any;
