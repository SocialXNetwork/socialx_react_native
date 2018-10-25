import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		paddingTop: Sizes.smartVerticalScale(30),
		alignItems: 'center',
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(120),
		color: Colors.cloudBurst,
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.cloudBurst,
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
};

export default StyleSheet.create(styles);
