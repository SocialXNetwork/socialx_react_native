import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
		width,
		height,
		margin: 0,
		padding: 0,
	},
	container: {
		maxWidth: width * 0.8,
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartVerticalScale(7.5),
	},
	details: {
		paddingVertical: Sizes.smartVerticalScale(25),
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartVerticalScale(16),
		marginBottom: Sizes.smartVerticalScale(7.5),
		textAlign: 'center',
	},
	description: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartVerticalScale(13),
		color: Colors.dustyGray,
		textAlign: 'center',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(12.5),
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.silverSand,
	},
	normal: {
		...Fonts.centuryGothic,
	},
	danger: {
		color: Colors.ceriseRed,
	},
});
