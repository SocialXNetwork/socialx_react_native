import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartVerticalScale(8),
		paddingLeft: Sizes.smartHorizontalScale(16),
		paddingVertical: Sizes.smartVerticalScale(16),
	},
	carouselContainer: {
		paddingTop: Sizes.smartVerticalScale(16),
	},
	header: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(18),
	},
};

export default StyleSheet.create(styles);
