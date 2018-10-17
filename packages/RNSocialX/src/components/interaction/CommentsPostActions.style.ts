import { StyleSheet } from 'react-native';

import { Colors, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: Sizes.smartVerticalScale(10),
		paddingVertical: Sizes.smartVerticalScale(5),
		marginHorizontal: Sizes.smartHorizontalScale(15),
		borderTopWidth: 0.5,
		borderColor: Colors.grayNurse,
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(24),
		marginBottom: Sizes.smartVerticalScale(4),
		marginLeft: Sizes.smartHorizontalScale(5),
		color: Colors.black,
	},
};

export default StyleSheet.create(styles);
