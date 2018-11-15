import { StyleSheet } from 'react-native';
import { Sizes } from '../../environment/theme';

const styles: any = {
	resultsContainer: {
		flex: 1,
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		paddingTop: Sizes.smartVerticalScale(16),
	},
	bottomLoadingContainer: {
		paddingVertical: Sizes.smartVerticalScale(20),
	},
};

export default StyleSheet.create(styles);
