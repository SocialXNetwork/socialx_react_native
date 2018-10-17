import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 0,
	},
	boxContainer: {
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartHorizontalScale(9),
		maxWidth: 500,
		width: '80%',
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
	titleContainer: {
		width: '100%',
		backgroundColor: Colors.pink,
		borderTopLeftRadius: Sizes.smartHorizontalScale(9),
		borderTopRightRadius: Sizes.smartHorizontalScale(9),
		paddingTop: Sizes.smartVerticalScale(14),
		paddingBottom: Sizes.smartVerticalScale(17),
		paddingHorizontal: Sizes.smartHorizontalScale(24),
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.white,
		textAlign: 'center',
	},
	message: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(21),
		color: Colors.cloudBurst,
		paddingLeft: Sizes.smartHorizontalScale(19),
		paddingRight: Sizes.smartHorizontalScale(32),
		paddingVertical: Sizes.smartVerticalScale(19),
		textAlign: 'left',
	},
	messageContainer: {
		width: '100%',
		borderBottomWidth: Sizes.smartVerticalScale(1),
		borderBottomColor: Colors.mercury,
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(16),
		flex: 1,
	},
	leftButton: {
		borderRightColor: Colors.mercury,
		borderRightWidth: Sizes.smartVerticalScale(1),
	},
	buttonText: {
		textAlign: 'center',
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(18),
	},
	buttonTextConfirm: {
		color: Colors.pink,
	},
	buttonTextCancel: {
		color: Colors.cloudBurst,
	},
};

export default StyleSheet.create(style);
