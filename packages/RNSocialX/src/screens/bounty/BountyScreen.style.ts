import { Platform, StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: Colors.white,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginVertical: Sizes.smartVerticalScale(10),
	},
	input: {
		borderColor: Colors.dustGray,
		backgroundColor: Colors.athensGray,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartHorizontalScale(2),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	iconContainer: {
		marginHorizontal: Sizes.smartHorizontalScale(10),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.pink,
	},
});
