import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		width: '100%',
		backgroundColor: Colors.white,
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
