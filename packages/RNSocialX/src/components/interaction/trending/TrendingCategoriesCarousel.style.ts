import {StyleSheet} from 'react-native';
import {Sizes} from '../../../environment/theme';

const styles: any = {
	container: {
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	categoryContainer: {
		flexGrow: 0,
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
};

export default StyleSheet.create(styles);
