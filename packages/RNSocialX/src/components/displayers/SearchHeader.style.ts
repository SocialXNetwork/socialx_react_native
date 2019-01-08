import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		backgroundColor: Colors.pink,
	},
	inputContainer: {
		flexDirection: 'row',
		height: Sizes.smartVerticalScale(45),
		width: '100%',
		paddingVertical: Sizes.smartVerticalScale(2.5),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	backIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.white,
		paddingLeft: Sizes.smartHorizontalScale(5),
		paddingRight: Sizes.smartHorizontalScale(13),
	},
	inputOverlay: {
		backgroundColor: Colors.transparent,
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
};

export default StyleSheet.create(styles);

export const colors = {
	icon: Colors.cadetBlue,
	border: Colors.transparent,
	iosInputCancel: Colors.paleSky,
};
