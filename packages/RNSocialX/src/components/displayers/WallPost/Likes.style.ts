import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingTop: Sizes.smartVerticalScale(5),
	},
	wrapper: {
		flexDirection: 'row',
	},
	normal: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
	},
	bold: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
	},
};

export default StyleSheet.create(styles);
