import { Dimensions, StyleSheet } from 'react-native';
import { Sizes } from '../../../environment/theme';
export const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
