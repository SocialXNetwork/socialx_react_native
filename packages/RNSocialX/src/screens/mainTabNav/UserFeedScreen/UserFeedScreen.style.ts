import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	post: {
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(8),
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
};

export default StyleSheet.create(styles) as any;
