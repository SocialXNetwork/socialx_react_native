import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

export default StyleSheet.create({
	container: {
		marginHorizontal: Sizes.smartHorizontalScale(16),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
	},
	more: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.pink,
		paddingLeft: Sizes.smartHorizontalScale(5),
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
});
