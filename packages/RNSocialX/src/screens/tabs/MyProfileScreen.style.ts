import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ICON_SIZE = Sizes.smartHorizontalScale(20);

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.pink,
	},
	icon: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
	scrollContainer: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	post: {
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(8),
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
	spacer: {
		backgroundColor: Colors.white,
		height: SCREEN_HEIGHT,
		bottom: -SCREEN_HEIGHT,
		position: 'absolute',
		left: 0,
		right: 0,
	},
});
