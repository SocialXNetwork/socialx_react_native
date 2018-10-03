import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
	},
	content: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	label: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		paddingVertical: Sizes.smartVerticalScale(7.5),
	},
	input: {
		paddingVertical: Sizes.smartVerticalScale(7.5),
	},
	buttons: {
		marginVertical: Sizes.smartVerticalScale(15),
	},
	button: {
		marginBottom: Sizes.smartVerticalScale(15),
	},
};

export default StyleSheet.create(styles);
export const defaultStyles = {
	pink: Colors.pink,
};
