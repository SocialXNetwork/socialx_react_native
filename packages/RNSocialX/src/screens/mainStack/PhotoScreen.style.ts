import {StyleSheet} from 'react-native';

import {Colors, Fonts, Icons, Sizes} from '../../environment/theme';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
	},
	scrollView: {
		backgroundColor: Colors.white,
	},
	photoContainer: {
		marginTop: Sizes.smartVerticalScale(11),
		paddingHorizontal: '5%',
		width: '100%',
		height: Sizes.smartHorizontalScale(130),
	},
	paddingContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(24),
	},
	smallText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	multilineTextInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.postFullName,
	},
	withMaxHeight: {
		maxHeight: Sizes.smartVerticalScale(80),
	},
	checkboxButtonContainer: {
		marginTop: Sizes.smartVerticalScale(10),
	},
	addMediaContainer: {
		width: '100%',
		alignItems: 'center',
	},
	addMediaButton: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
	},
	photoIcon: {
		width: Sizes.smartHorizontalScale(22),
		height: Sizes.smartHorizontalScale(22),
		marginRight: Sizes.smartHorizontalScale(8),
	},
	addMediaText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	iconLocationPin: Icons.iconLocationPin,
	underlineColorTransparent: Colors.transparent,
	iconInviteFriends: Icons.iconInviteFriends,
	iconNewPostAddMedia: Icons.iconNewPostAddMedia,
};
