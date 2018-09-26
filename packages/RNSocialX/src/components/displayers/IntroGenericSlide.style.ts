import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		flex: 1,
		alignItems: 'center',
	},
	slideImage: {
		height: Sizes.smartHorizontalScale(264),
		maxWidth: '90%',
		marginTop: Sizes.smartVerticalScale(20),
		marginBottom: Sizes.smartVerticalScale(30),
	},
	textContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	slideTitle: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(42),
		color: Colors.white,
		textAlign: 'center',
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	slideDescription: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(18),
		color: Colors.white,
		textAlign: 'center',
		paddingTop: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(style);
