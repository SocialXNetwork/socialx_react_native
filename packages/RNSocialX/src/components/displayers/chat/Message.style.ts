import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';
const { width } = Dimensions.get('window');

const AVATAR_SIZE = Sizes.smartHorizontalScale(30);
const MARGIN_RIGHT_AVATAR = Sizes.smartHorizontalScale(10);

export const styles = StyleSheet.create({
	gradient: {
		paddingVertical: Sizes.smartVerticalScale(7.5),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		maxWidth: width * 0.75,
	},
	overflow: {
		borderRadius: Sizes.smartHorizontalScale(15),
		marginBottom: Sizes.smartVerticalScale(12),
		overflow: 'hidden',
	},
	background: {
		paddingVertical: Sizes.smartVerticalScale(7.5),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		borderRadius: Sizes.smartHorizontalScale(15),
		marginBottom: Sizes.smartVerticalScale(12),
		maxWidth: width * 0.75,
	},
	avatarContainer: {
		marginRight: Sizes.smartVerticalScale(MARGIN_RIGHT_AVATAR),
		marginBottom: Sizes.smartHorizontalScale(12),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	self: {
		color: Colors.white,
	},
	timestamp: {
		position: 'absolute',
		transform: [{ translateY: 2 }],
		width,
		color: Colors.dustGray,
		...Fonts.centuryGothic,
		textAlign: 'center',
	},
	status: {
		position: 'absolute',
		width: Sizes.smartHorizontalScale(width - 48),
		transform: [{ translateY: 4 }],
		color: Colors.dustGray,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		textAlign: 'right',
	},
	checkmark: {
		position: 'absolute',
		transform: [{ translateY: 4.5 }],
		width: Sizes.smartHorizontalScale(width - 32),
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.pink,
		textAlign: 'right',
	},
	atomAvatar: {
		position: 'absolute',
		right: 0,
		transform: [{ translateY: 4.5 }],
		width: Sizes.smartHorizontalScale(15),
		height: Sizes.smartHorizontalScale(15),
		borderRadius: Sizes.smartHorizontalScale(7.5),
	},
});

export const leftStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	first: {
		marginBottom: Sizes.smartVerticalScale(2.5),
		borderBottomLeftRadius: Sizes.smartHorizontalScale(3),
	},
	middle: {
		marginBottom: Sizes.smartVerticalScale(2.5),
		borderTopLeftRadius: Sizes.smartHorizontalScale(3),
		borderBottomLeftRadius: Sizes.smartHorizontalScale(3),
	},
	last: {
		borderTopLeftRadius: Sizes.smartHorizontalScale(3),
	},
	specialMargin: {
		marginLeft: Sizes.smartHorizontalScale(AVATAR_SIZE + MARGIN_RIGHT_AVATAR),
	},
	noSpecialMargin: {
		marginLeft: 0,
	},
});

export const rightStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	first: {
		marginBottom: Sizes.smartVerticalScale(2.5),
		borderBottomRightRadius: Sizes.smartHorizontalScale(3),
	},
	middle: {
		marginBottom: Sizes.smartVerticalScale(2.5),
		borderTopRightRadius: Sizes.smartHorizontalScale(3),
		borderBottomRightRadius: Sizes.smartHorizontalScale(3),
	},
	last: {
		borderTopRightRadius: Sizes.smartHorizontalScale(3),
	},
});
