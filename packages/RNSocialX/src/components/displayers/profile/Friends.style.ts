import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 1,
		borderColor: Colors.gallery,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
	},
	friends: {
		flexDirection: 'row',
		transform: [{ translateX: 15 }],
	},
};

export default StyleSheet.create(styles);
