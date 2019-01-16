import { StyleSheet } from 'react-native';
import { Colors, colorWithAlpha, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	fullWidth: {
		width: '100%',
		height: Sizes.smartVerticalScale(254),
		flexDirection: 'row',
	},
	fullHeightHalfWidth: {
		width: '50%',
		height: '100%',
	},
	fullWidthHeight: {
		width: '100%',
		height: '100%',
	},
	fullWidthHalfHeight: {
		width: '100%',
		height: '50%',
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: colorWithAlpha(Colors.black, 0.75),
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(24),
		color: Colors.white,
	},
	rightBorder: {
		borderRightWidth: 1,
		borderColor: Colors.white,
	},
	leftBorder: {
		borderLeftWidth: 1,
		borderColor: Colors.white,
	},
	topBorder: {
		borderTopWidth: 1,
		borderColor: Colors.white,
	},
	bottomBorder: {
		borderBottomWidth: 1,
		borderColor: Colors.white,
	},
};

export default StyleSheet.create(styles);
