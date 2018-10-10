import { Platform, StyleSheet } from 'react-native';
import { OS_TYPES } from '../../environment/consts';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		flexDirection: 'row',
		paddingLeft: Sizes.smartHorizontalScale(24),
		paddingRight: Sizes.smartHorizontalScale(16),
		paddingTop: Sizes.smartVerticalScale(20),
		paddingBottom: Sizes.smartVerticalScale(15),
		borderRadius: Sizes.smartHorizontalScale(4),
		borderWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.dustWhite,
		alignItems: 'flex-start',
	},
	leftContainer: {
		flex: 1,
	},
	title: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(21),
		marginRight: Sizes.smartHorizontalScale(10),
	},
	description: {
		...Fonts.centuryGothic,
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(23),
		marginRight: Sizes.smartHorizontalScale(10),
	},
	switch: {
		transform: [Platform.OS === OS_TYPES.IOS ? { scale: 0.7 } : { scale: 1 }],
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	onTintColor: Colors.pink,
	thumbTintColor: Colors.white,
};
