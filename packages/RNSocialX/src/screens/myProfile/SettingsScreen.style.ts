import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: Colors.white,
		paddingBottom: Sizes.smartVerticalScale(78),
	},
	keyboard: {
		backgroundColor: Colors.white,
	},
	picker: {
		paddingTop: Sizes.smartVerticalScale(25),
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	input: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingVertical: Sizes.smartVerticalScale(5),
		borderBottomWidth: 1,
		borderBottomColor: Colors.dustWhite,
	},
	firstInput: {
		borderTopWidth: 1,
		borderTopColor: Colors.dustWhite,
		marginTop: Sizes.smartVerticalScale(10),
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	description: {
		...Fonts.centuryGothic,
	},
	mining: {
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	errorText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(16),
		marginBottom: Sizes.smartVerticalScale(5),
		color: Colors.monza,
	},
});
