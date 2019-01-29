import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';
const INPUT_FONT_SIZE = Sizes.smartHorizontalScale(14);

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartHorizontalScale(6),
	},
	inputContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: Sizes.smartHorizontalScale(6),
		height: '100%',
	},
	textInput: {
		flex: 1,
		...Fonts.centuryGothic,
		fontSize: INPUT_FONT_SIZE,
		color: Colors.shuttleGray,
	},
	multilineTextInput: {
		paddingVertical: Platform.select({
			android: Sizes.smartVerticalScale(3),
			ios: Sizes.smartVerticalScale(7.5),
		}),
	},
	textInputNormal: {
		paddingVertical: Platform.select({
			android: Sizes.smartVerticalScale(10),
			ios: Sizes.smartVerticalScale(16),
		}),
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
});
