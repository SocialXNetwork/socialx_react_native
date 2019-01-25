import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginBottom: Sizes.smartHorizontalScale(5),
		marginTop: Sizes.smartVerticalScale(10),
	},
	input: {
		borderColor: Colors.dustGray,
		backgroundColor: Colors.alabaster,
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
