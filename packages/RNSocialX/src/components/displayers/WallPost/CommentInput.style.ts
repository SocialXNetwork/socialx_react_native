import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		marginTop: Sizes.smartVerticalScale(5),
	},
	inputContainer: {
		borderWidth: Sizes.smartHorizontalScale(1),
		borderRadius: Sizes.smartHorizontalScale(5),
		borderColor: Colors.dustyGray,
		...Platform.select({
			android: {
				maxHeight: Sizes.smartVerticalScale(40),
			},
		}),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	animatingInput: {
		maxWidth: SCREEN_WIDTH - Sizes.smartHorizontalScale(80),
	},
	avatar: {
		width: Sizes.smartHorizontalScale(35),
		height: Sizes.smartHorizontalScale(35),
		borderRadius: Sizes.smartHorizontalScale(35) / 2,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	send: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(30),
		marginLeft: Sizes.smartHorizontalScale(5),
	},
});
