import { StyleSheet } from 'react-native';
import { Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(5),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(24),
		marginLeft: Sizes.smartHorizontalScale(10),
		transform: [{ translateY: -2 }],
	},
};

export default StyleSheet.create(styles);
