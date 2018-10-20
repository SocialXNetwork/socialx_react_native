import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		padding: Sizes.smartHorizontalScale(20),
	},
	heading: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.paleSky,
	},
};

export default StyleSheet.create(styles);
export const defaultColor = Colors.wildSand;
