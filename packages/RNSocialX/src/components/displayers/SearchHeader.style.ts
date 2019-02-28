import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.pink,
	},
	floating: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		width: '100%',
		backgroundColor: Colors.pink,
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: Sizes.smartVerticalScale(45),
		paddingVertical: Sizes.smartVerticalScale(2.5),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	backButton: {
		marginLeft: Sizes.smartHorizontalScale(11),
		marginRight: Sizes.smartHorizontalScale(17.5),
	},
	inputContainer: {
		flex: 1,
	},
	inputOverlay: {
		backgroundColor: Colors.transparent,
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
});
