import {StyleSheet} from 'react-native';
import {Colors, colorWithAlpha, Sizes} from '../../../environment/theme';

const styles: any = {
	container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	playIcon: {
		fontSize: Sizes.smartHorizontalScale(50),
		lineHeight: Sizes.smartHorizontalScale(50),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		color: Colors.white,
	},
	muteButton: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	smallControlIcon: {
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(29),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		color: Colors.white,
	},
	resizeButton: {
		position: 'absolute',
		top: 0,
		right: 0,
	},
	thumbOverlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: colorWithAlpha(Colors.black, 0.3),
		alignItems: 'flex-end',
	},
	thumbVideoIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		lineHeight: Sizes.smartHorizontalScale(30),
		color: Colors.white,
		paddingRight: Sizes.smartHorizontalScale(10),
		paddingTop: Sizes.smartHorizontalScale(10),
	},
	loadingContainer: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
};

export const defaultColor = Colors.pink;
export default StyleSheet.create(styles);
