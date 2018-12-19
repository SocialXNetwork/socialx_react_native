import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
		paddingVertical: Sizes.smartVerticalScale(2),
	},
	user: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	text: {
		fontSize: Sizes.smartHorizontalScale(15),
	},
	hashtag: {
		...Fonts.centuryGothicBold,
	},
	tag: {
		color: Colors.pink,
	},
	url: {
		color: Colors.pink,
	},
};

export default StyleSheet.create(styles);
