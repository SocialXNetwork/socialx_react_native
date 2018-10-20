import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const USER_AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	shareMessageContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingVertical: Sizes.smartVerticalScale(9),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(0.5),
	},
	textInput: {
		padding: 0,
	},
	captionContainer: {
		minHeight: USER_AVATAR_SIZE,
		maxHeight: Sizes.smartVerticalScale(120),
		flex: 1,
		justifyContent: 'center',
	},
	captionTextInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.cloudBurst,
	},
	avatarImage: {
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
