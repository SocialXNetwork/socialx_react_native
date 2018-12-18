import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		marginTop: Sizes.smartVerticalScale(5),
	},
	inputContainer: {
		borderWidth: Sizes.smartHorizontalScale(1),
		borderRadius: Sizes.smartHorizontalScale(6),
		borderColor: Colors.grayText,
		width: SCREEN_WIDTH - Sizes.smartHorizontalScale(85),
		maxWidth: SCREEN_WIDTH - Sizes.smartHorizontalScale(85),
		...Platform.select({
			android: {
				maxHeight: Sizes.smartVerticalScale(40),
			},
		}),
	},
	avatar: {
		width: Sizes.smartHorizontalScale(35),
		height: Sizes.smartHorizontalScale(35),
		borderRadius: Sizes.smartHorizontalScale(35) / 2,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	send: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(30),
		transform: [{ translateY: 2 }],
	},
};

export default StyleSheet.create(styles);
