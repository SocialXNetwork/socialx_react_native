import { StyleSheet } from 'react-native';

import { Colors, colorWithAlphaArray, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.wildSand,
	},
	description: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
		paddingLeft: Sizes.smartVerticalScale(24),
		paddingVertical: Sizes.smartVerticalScale(20),
		backgroundColor: Colors.white,
	},
	marginBetweenTitleAndInput: {
		marginBottom: Sizes.smartVerticalScale(29),
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	currentNodesText: {
		flex: 1,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		paddingVertical: Sizes.smartVerticalScale(7),
		color: Colors.cloudBurst,
		textAlign: 'left',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		height: Sizes.smartVerticalScale(30),
		backgroundColor: Colors.ceriseRed,
	},
	listContainer: {
		backgroundColor: Colors.white,
	},
	listItem: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		paddingVertical: Sizes.smartVerticalScale(20),
		borderBottomWidth: 1,
		borderBottomColor: Colors.dustWhite,
		lineHeight: Sizes.smartVerticalScale(2),
	},
	node: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
	},
	checkbox: {
		left: 0,
	},
};

export const buttonWidth = Sizes.smartHorizontalScale(110);

export default StyleSheet.create(styles);

export const defaultStyles = {
	checkboxColor: Colors.pink,
	buttonBorderColor: Colors.white,
	buttonTextColor: Colors.white,
};
