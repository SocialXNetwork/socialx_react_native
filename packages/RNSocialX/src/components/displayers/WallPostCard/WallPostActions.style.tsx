import { StyleSheet } from 'react-native';
import { Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flexDirection: 'row',
		marginHorizontal: Sizes.smartHorizontalScale(5),
		paddingTop: Sizes.smartVerticalScale(5),
		justifyContent: 'space-between',
	},
	rightContainer: {
		flexDirection: 'row',
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(24),
		transform: [{ translateY: -2 }],
	},
};

export default StyleSheet.create(styles);
