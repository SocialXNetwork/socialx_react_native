import { StyleSheet } from 'react-native';
import { Sizes } from '../../environment/theme';

const styles: any = {
	resultsContainer: {
		flex: 1,
	},
	bottomLoadingContainer: {
		paddingVertical: Sizes.smartVerticalScale(20),
	},
};

export default StyleSheet.create(styles);
