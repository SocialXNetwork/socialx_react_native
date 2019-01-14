import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.transparent,
		paddingVertical: Sizes.smartVerticalScale(5),
	},
	border: {
		borderColor: Colors.gallery,
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.background,
	},
	active: {
		color: Colors.pink,
	},
};

export default StyleSheet.create(styles);
