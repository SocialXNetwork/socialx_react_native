import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		paddingBottom: Sizes.smartHorizontalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
	},
};

export default StyleSheet.create(styles);
