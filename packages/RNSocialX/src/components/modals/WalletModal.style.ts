import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export const ELEMENT_WIDTH = Sizes.smartHorizontalScale(220);
export const QR_WIDTH = Sizes.smartHorizontalScale(200);

const styles: any = {
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	box: {
		backgroundColor: Colors.blackWithAlpha(0.7),
		paddingVertical: Sizes.smartHorizontalScale(20),
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		borderRadius: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.white,
		paddingBottom: Sizes.smartHorizontalScale(20),
		textAlign: 'center',
	},
	addressContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: Sizes.smartVerticalScale(20),
	},
	textContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: Sizes.smartHorizontalScale(16),
	},
	message: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.white,
		paddingBottom: Sizes.smartHorizontalScale(5),
		textAlign: 'center',
	},
	address: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.white,
		textAlign: 'center',
	},
	qr: {
		justifyContent: 'center',
		alignItems: 'center',
		width: ELEMENT_WIDTH,
		height: ELEMENT_WIDTH,
		backgroundColor: Colors.white,
		marginBottom: Sizes.smartVerticalScale(20),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(24),
		color: Colors.pink,
	},
};

export default StyleSheet.create(styles);
export const defaultStyles = {
	pink: Colors.pink,
};
