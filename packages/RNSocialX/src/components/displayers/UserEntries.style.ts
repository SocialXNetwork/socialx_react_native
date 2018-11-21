import { StyleSheet } from 'react-native';
import { Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		paddingVertical: Sizes.smartVerticalScale(16),
	},
};

export default StyleSheet.create(styles);
