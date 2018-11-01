import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		paddingVertical: Sizes.smartVerticalScale(16),
	},
	mediaContainer: {
		marginTop: Sizes.smartVerticalScale(10),
	},
	postedTimeContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		marginVertical: Sizes.smartVerticalScale(10),
	},
	postedTime: {
		fontSize: Sizes.smartHorizontalScale(10),
		color: Colors.grayText,
	},
};

export default StyleSheet.create(styles);
export const SCREEN_WIDTH = Dimensions.get('window').width;
