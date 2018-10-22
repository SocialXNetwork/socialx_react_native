import { StyleSheet } from 'react-native';

import { Colors, Sizes } from '../../environment/theme';

const INPUT_CONTAINER_VERTICAL_PADDING = Sizes.smartVerticalScale(7.5);

const styles: any = {
	container: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingVertical: INPUT_CONTAINER_VERTICAL_PADDING,
		borderTopColor: Colors.gallery,
		borderTopWidth: 0.5,
		maxHeight: Sizes.smartVerticalScale(110),
	},
	inputContainer: {
		flex: 8,
		borderRadius: Sizes.smartHorizontalScale(6),
		borderColor: Colors.grayText,
		borderWidth: Sizes.smartHorizontalScale(1),
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
