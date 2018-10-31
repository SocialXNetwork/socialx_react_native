import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		marginHorizontal: Sizes.smartHorizontalScale(16),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
	},
	showMoreText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postHour,
		paddingLeft: Sizes.smartHorizontalScale(5),
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
