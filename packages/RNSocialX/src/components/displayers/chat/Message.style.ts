import { Dimensions, Platform, StyleSheet } from 'react-native';
import { OS_TYPES } from '../../../environment/consts';
import { Colors, Fonts, Sizes } from '../../../environment/theme';
const { width } = Dimensions.get('window');

const AVATAR_SIZE = Sizes.smartHorizontalScale(30);

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
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	self: {
		color: Colors.white,
	},
	row: {
		flexDirection: 'row',
		position: Platform.OS === OS_TYPES.IOS ? 'absolute' : 'relative',
		transform: Platform.OS === OS_TYPES.IOS ? [{ translateY: 4 }] : [],
		marginVertical: Platform.OS === OS_TYPES.Android ? Sizes.smartVerticalScale(2) : 0,
	},
	spacer: {
		flex: 1,
	},
	timestamp: {
		flexDirection: 'row',
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
	row: {
		flexDirection: 'row',
	},
	avatarContainer: {
		marginRight: Sizes.smartVerticalScale(10),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	spacer: {
		width: Sizes.smartHorizontalScale(40),
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
