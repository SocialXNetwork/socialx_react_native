import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Icons, Sizes} from '../../environment/theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const ICON_SIZE = Sizes.smartHorizontalScale(20);

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.pink,
	},
	scrollContainer: {
		width: '100%',
		backgroundColor: Colors.white,
	},
	gridContainer: {
		width: '100%',
		minHeight: 1,
	},
	titleBarRightButton: {
		marginRight: Sizes.smartHorizontalScale(13),
	},
	whiteBottomView: {
		position: 'absolute',
		backgroundColor: Colors.white,
		width: '100%',
		height: SCREEN_HEIGHT / 2,
		bottom: 0,
	},
	titleBarLeftButton: {
		marginLeft: Sizes.smartHorizontalScale(10),
	},
	icon: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
};

export default StyleSheet.create(styles);
export const colors = {white: Colors.white};
export const icons = Icons;
