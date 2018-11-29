import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	user: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(15),
	} as any,
	text: {
		fontSize: Sizes.smartHorizontalScale(15),
	},
	hashtag: {
		color: Colors.pink,
	},
	tag: {
		color: Colors.pink,
	},
	url: {
		color: Colors.pink,
	},
};

export default StyleSheet.create(styles);
