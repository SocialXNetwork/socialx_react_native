import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		paddingTop: Sizes.smartVerticalScale(30),
		alignItems: 'center',
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(120),
		color: Colors.geyser,
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
};

export default StyleSheet.create(styles);
