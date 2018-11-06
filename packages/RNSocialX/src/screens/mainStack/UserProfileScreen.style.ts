import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.pink,
	},
	scrollContainer: {
		width: '100%',
		backgroundColor: Colors.white,
	},
	wallPostContainer: {
		paddingBottom: Sizes.smartVerticalScale(25),
	},
	contentContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	postsContainer: {
		width: '100%',
	},
	gridContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		minHeight: 1,
		width: '100%',
	},
	whiteBottomView: {
		position: 'absolute',
		backgroundColor: Colors.white,
		width: '100%',
		height: SCREEN_HEIGHT / 2,
		bottom: 0,
	},
	loading: {
		flex: 1,
		alignItems: 'center',
		paddingTop: Sizes.smartVerticalScale(30),
	},
};

export default StyleSheet.create(styles);
export const colors = {
	white: Colors.white,
};
