import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

const styles: any = {
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
		flex: 1,
		paddingVertical: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
};

export default StyleSheet.create(styles);
