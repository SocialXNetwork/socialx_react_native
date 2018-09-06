import {StyleSheet} from 'react-native';
import {Colors, colorWithAlpha, Fonts, Sizes} from '../../environment/theme';

const style: any = {
	postMediaContainerFullWidth: {
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
	moreOverlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: colorWithAlpha(Colors.black, 0.5),
		alignItems: 'center',
		justifyContent: 'center',
	},
	moreText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.white,
	},
};

export default StyleSheet.create(style);
