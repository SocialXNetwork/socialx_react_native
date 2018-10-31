import { StyleSheet } from 'react-native';
import { Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
		marginTop: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(24),
		marginLeft: Sizes.smartHorizontalScale(7.5),
		transform: [{ translateY: -2 }],
	},
};

export default StyleSheet.create(styles);
