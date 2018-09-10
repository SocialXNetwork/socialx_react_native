import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../environment/theme';

const styles: any = {
	container: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		flexDirection: 'row',
		marginTop: Sizes.smartVerticalScale(10),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
	},
	bold: {
		...Fonts.centuryGothicBold,
	},
};

export default StyleSheet.create(styles);
