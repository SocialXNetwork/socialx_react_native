import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const CONTAINER_SIZE = Sizes.smartHorizontalScale(40);
const ICON_SIZE = Sizes.smartHorizontalScale(30);

const styles: any = {
	container: {
		paddingVertical: Sizes.smartVerticalScale(15),
		backgroundColor: Colors.pink,
	},
	content: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	stepIcon: {
		color: Colors.paleSky,
		fontSize: ICON_SIZE,
	},
	stepIconSelected: {
		color: Colors.white,
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: CONTAINER_SIZE,
		height: CONTAINER_SIZE,
		backgroundColor: Colors.white,
		borderRadius: CONTAINER_SIZE / 2,
	},
	iconContainerSelected: {
		backgroundColor: Colors.postHour,
	},
	connectorView: {
		backgroundColor: Colors.white,
		width: Sizes.smartHorizontalScale(42),
		height: Sizes.smartVerticalScale(4),
	},
	nextIconContainer: {
		height: '100%',
		justifyContent: 'center',
		position: 'absolute',
		right: Sizes.smartHorizontalScale(20),
	},
	nextIcon: {
		fontSize: ICON_SIZE,
		color: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
};

export default StyleSheet.create(styles);
