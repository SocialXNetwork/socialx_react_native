import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';
const { width } = Dimensions.get('window');

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
		backgroundColor: Colors.gallery,
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
});

export const leftStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
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
});

export const rightStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
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
