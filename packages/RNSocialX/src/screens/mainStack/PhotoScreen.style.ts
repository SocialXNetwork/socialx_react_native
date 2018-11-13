import { StyleSheet } from 'react-native';

import { Colors, Fonts, Icons, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(10),
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
		color: Colors.paleSky,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	multilineTextInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.cloudBurst,
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
		color: Colors.paleSky,
	},
	buttonContainer: {
		width: '100%',
		alignItems: 'center',
		marginTop: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(styles);
export const defaultStyles = {
	buttonWidth: Sizes.smartHorizontalScale(150),
	transparent: Colors.transparent,
	location: Icons.iconLocationPin,
	inviteFriends: Icons.iconInviteFriends,
	addMedia: Icons.iconNewPostAddMedia,
};
