import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../environment/theme';

const styles: any = {
	textPadding: {
		marginHorizontal: Sizes.smartHorizontalScale(16),
		paddingBottom: Sizes.smartHorizontalScale(6),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
	},
	showMoreText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postHour,
		paddingLeft: Sizes.smartHorizontalScale(5),
	},
	hashtag: {
		color: 'rgba(98, 162, 225, 0.8)',
		textDecorationLine: 'underline',
	},
	tag: {
		color: 'black',
		fontWeight: 'bold',
	},
	url: {
		color: Colors.postHour,
		textDecorationLine: 'underline',
	},
};

export default StyleSheet.create(styles);
