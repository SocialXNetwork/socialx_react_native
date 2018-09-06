import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../environment/theme';

const REPLY_AVATAR_SIZE = Sizes.smartHorizontalScale(30);

const styles: any = {
	replyEntry: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		overflow: 'hidden',
		paddingVertical: Sizes.smartHorizontalScale(5),
	},
	replyUserContainer: {
		flexDirection: 'row',
		maxWidth: '50%',
		alignItems: 'center',
	},
	replyAvatar: {
		width: REPLY_AVATAR_SIZE,
		height: REPLY_AVATAR_SIZE,
		borderRadius: REPLY_AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	replyText: {
		flex: 1,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
		paddingLeft: Sizes.smartHorizontalScale(8),
	},
	replyUserFullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
		flex: 1,
	},
};

export default StyleSheet.create(styles);
