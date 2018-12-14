import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
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
