import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		backgroundColor: Colors.pink,
		height: Sizes.smartVerticalScale(45),
		justifyContent: 'center',
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartVerticalScale(16),
	},
	left: {
		flex: 1,
		justifyContent: 'center',
	},
	center: {
		flex: 2,
		justifyContent: 'center',
	},
	right: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.white,
		letterSpacing: Sizes.smartVerticalScale(2),
		lineHeight: Sizes.smartVerticalScale(16),
		textAlign: 'center',
	},
	placeholder: {
		flex: 1,
	},
};

export default StyleSheet.create(styles);
