import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	post: {
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(8),
	},
});
