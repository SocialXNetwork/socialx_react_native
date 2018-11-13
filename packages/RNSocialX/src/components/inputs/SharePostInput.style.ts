import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const USER_AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(9),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(0.5),
	},
	input: {
		padding: 0,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.cloudBurst,
	},
	inputContainer: {
		minHeight: USER_AVATAR_SIZE,
		maxHeight: Sizes.smartVerticalScale(120),
		flex: 1,
		justifyContent: 'center',
	},
	avatar: {
		width: USER_AVATAR_SIZE,
		height: USER_AVATAR_SIZE,
		borderRadius: USER_AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(13),
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	underlineColorAndroid: Colors.transparent,
};
