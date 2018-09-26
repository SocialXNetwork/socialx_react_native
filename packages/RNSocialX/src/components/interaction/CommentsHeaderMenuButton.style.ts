import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	rightHeader: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	lineContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: Sizes.smartHorizontalScale(7),
	},
	label: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.postFullName,
		textAlign: 'left',
	},
	iconView: {
		alignItems: 'center',
		width: Sizes.smartHorizontalScale(25),
	},
	selectedIcon: {
		color: Colors.postHour,
		fontSize: Sizes.smartHorizontalScale(18),
	},
	headerLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.postFullName,
		textAlign: 'center',
		backgroundColor: Colors.dustWhite,
		width: '100%',
		padding: Sizes.smartHorizontalScale(7),
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	dotsColor: Colors.black,
};
