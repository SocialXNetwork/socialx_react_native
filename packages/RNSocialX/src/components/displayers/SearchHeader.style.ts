import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.pink,
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center',
		height: Sizes.smartVerticalScale(45),
		width: '100%',
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

export const colors = {
	icon: Colors.cadetBlue,
	border: Colors.transparent,
	iosInputCancel: Colors.paleSky,
};
