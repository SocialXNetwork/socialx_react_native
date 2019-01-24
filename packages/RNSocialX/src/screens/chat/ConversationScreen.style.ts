import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	messages: {
		flex: 1,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: Sizes.smartHorizontalScale(5),
	},
	input: {
		borderWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.dustGray,
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
