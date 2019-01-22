import { Platform, StyleSheet } from 'react-native';

import { OS_TYPES } from '../../environment/consts';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const INPUT_FONT_SIZE = Sizes.smartHorizontalScale(14);

const style: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartHorizontalScale(6),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	inputContainer: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartHorizontalScale(6),
		height: '100%',
	},
	textInput: {
		...Fonts.centuryGothic,
		fontSize: INPUT_FONT_SIZE,
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		color: Colors.shuttleGray,
		flex: 1,
	},
	multilineTextInput: {
		paddingVertical: Sizes.smartVerticalScale(7.5),
	},
	textInputNormal: {
		paddingVertical:
			Platform.OS === OS_TYPES.Android
				? Sizes.smartVerticalScale(10)
				: Sizes.smartVerticalScale(16),
	},
	textInputSmall: {
		paddingVertical: 0,
		height: Sizes.smartVerticalScale(30),
	},
	textInputLarge: {
		paddingVertical: 0,
		height: Sizes.smartVerticalScale(60),
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	iconContainerNormal: {
		width: Sizes.smartHorizontalScale(40),
	},
	iconContainerSmall: {
		width: Sizes.smartHorizontalScale(30),
	},
	iconContainerLarge: {
		width: Sizes.smartHorizontalScale(50),
	},
	disabledInput: {
		opacity: 0.5,
	},
	cancelButton: {
		paddingRight: Sizes.smartHorizontalScale(10),
	},
	cancelButtonText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
	},
};

export default StyleSheet.create(style);

export const defaultStyles = {
	defaultIconColor: Colors.iron,
	defaultIconActiveColor: Colors.pink,
	defaultPlaceholderColor: Colors.dustyGray,
	defaultCancelTextColor: Colors.pink,
	defaultBorderColor: Colors.pink,
	defaultBorderWidth: Sizes.smartHorizontalScale(2),
	defaultUnderlineColorAndroid: Colors.transparent,
	iconHeightSmall: Sizes.smartHorizontalScale(20),
	iconHeightNormal: Sizes.smartHorizontalScale(30),
	iconHeightLarge: Sizes.smartHorizontalScale(30),
};
