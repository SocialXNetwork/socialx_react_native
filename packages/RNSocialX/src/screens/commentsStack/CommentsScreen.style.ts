import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	media: {
		marginTop: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(styles);
