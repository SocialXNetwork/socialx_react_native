import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		flexDirection: 'row',
		marginHorizontal: Sizes.smartHorizontalScale(15),
		paddingTop: Sizes.smartVerticalScale(5),
		marginVertical: Sizes.smartVerticalScale(5),
		justifyContent: 'space-between',
		borderTopColor: Colors.geyser,
		borderTopWidth: Sizes.smartHorizontalScale(0.5),
	},
	rightContainer: {
		flexDirection: 'row',
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(24),
		paddingBottom: Sizes.smartHorizontalScale(4),
	},
};

export default StyleSheet.create(styles);
