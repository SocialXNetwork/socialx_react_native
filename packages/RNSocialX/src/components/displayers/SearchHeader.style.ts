import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		backgroundColor: Colors.pink,
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center',
		height: Sizes.smartVerticalScale(45),
		width: '100%',
		paddingVertical: Sizes.smartVerticalScale(2.5),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	backButton: {
		marginHorizontal: Sizes.smartHorizontalScale(10),
	},
	inputContainer: {
		flex: 1,
	},
	spacing: {
		marginHorizontal: Sizes.smartHorizontalScale(5),
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
