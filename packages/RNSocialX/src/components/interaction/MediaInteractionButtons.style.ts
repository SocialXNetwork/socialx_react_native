import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	mediaInfoSection: {
		width: '100%',
		paddingBottom: Sizes.smartVerticalScale(10),
		marginBottom: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		// borderBottomColor: Colors.postText,
		// borderBottomWidth: Sizes.smartHorizontalScale(2),
		flexDirection: 'row',
	},
	infoText: {
		...Fonts.centuryGothic,
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(16),
	},
};

export default StyleSheet.create(styles);
