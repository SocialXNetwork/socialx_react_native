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
	currentNodesText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	listContainer: {
		backgroundColor: Colors.white,
	},
	listItem: {
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
	iconContainer: {
		justifyContent: 'flex-end',
	},
	deleteIcon: {
		color: Colors.ceriseRed,
		fontSize: Sizes.smartHorizontalScale(25),
	},
};

export default StyleSheet.create(styles);
