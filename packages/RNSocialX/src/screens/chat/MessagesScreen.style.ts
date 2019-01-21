import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	entries: {
		flex: 1,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(styles);
