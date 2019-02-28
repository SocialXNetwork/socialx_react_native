import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	underline: {
		height: Sizes.smartVerticalScale(1),
		backgroundColor: Colors.pink,
	},
	tab: {
		backgroundColor: Colors.white,
	},
	title: {
		...Fonts.centuryGothic,
		color: Colors.background,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	active: {
		color: Colors.pink,
	},
	coming: {
		paddingTop: Sizes.smartVerticalScale(100),
		paddingHorizontal: Sizes.smartHorizontalScale(30),
		alignItems: 'center',
	},
	text: {
		...Fonts.centuryGothic,
		color: Colors.dustyGray,
		fontSize: Sizes.smartHorizontalScale(16),
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
	},
	icon: {
		fontSize: Sizes.smartVerticalScale(72),
		color: Colors.paleSky,
	},
});
