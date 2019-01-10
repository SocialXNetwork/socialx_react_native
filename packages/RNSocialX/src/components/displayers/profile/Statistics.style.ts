import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: Sizes.smartHorizontalScale(10),
		height: Sizes.smartVerticalScale(50),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.white,
	},
	value: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.pink,
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.white,
	},
};

export default StyleSheet.create(styles);
