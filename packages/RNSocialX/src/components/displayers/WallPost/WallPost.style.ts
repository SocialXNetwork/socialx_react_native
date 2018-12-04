import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		paddingVertical: Sizes.smartVerticalScale(16),
	},
	media: {
		marginTop: Sizes.smartVerticalScale(10),
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
};

export default StyleSheet.create(styles);
export const SCREEN_WIDTH = Dimensions.get('window').width;
