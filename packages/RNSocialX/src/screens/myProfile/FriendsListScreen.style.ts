import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	input: {
		backgroundColor: Colors.pink,
		height: Sizes.smartVerticalScale(45),
		width: '100%',
		paddingVertical: Sizes.smartVerticalScale(2.5),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	friends: {
		paddingVertical: Sizes.smartVerticalScale(10),
	},
});
