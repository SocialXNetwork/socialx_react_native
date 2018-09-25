import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		paddingTop: Sizes.smartVerticalScale(16),
	},
	title: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(20),
		paddingBottom: Sizes.smartVerticalScale(16),
	},
};

export default StyleSheet.create(styles);
