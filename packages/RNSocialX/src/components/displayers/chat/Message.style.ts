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
	row: {
		flexDirection: 'row',
		position: 'absolute',
		transform: [{ translateY: 4 }],
	},
	spacer: {
		flex: 1,
	},
	timestamp: {
		flex: 1,
		alignItems: 'center',
	},
	status: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	smallText: {
		fontSize: Sizes.smartHorizontalScale(12),
	},
	grayText: {
		color: Colors.dustGray,
	},
	check: {
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.pink,
		transform: [{ translateY: 1 }],
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	seen: {
		width: Sizes.smartHorizontalScale(15),
		height: Sizes.smartHorizontalScale(15),
		borderRadius: Sizes.smartHorizontalScale(7.5),
		marginLeft: Sizes.smartHorizontalScale(5),
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
