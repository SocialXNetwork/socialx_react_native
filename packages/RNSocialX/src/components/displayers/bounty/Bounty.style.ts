import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const CURRENCY_ICON_SIZE = Sizes.smartHorizontalScale(70);

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: Colors.white,
		paddingVertical: Sizes.smartVerticalScale(7.5),
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		marginBottom: Sizes.smartVerticalScale(12),
		justifyContent: 'center',
	},
	imageContainer: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	coinIcon: {
		width: CURRENCY_ICON_SIZE,
		height: CURRENCY_ICON_SIZE,
	},
	animation: {
		width: Sizes.smartHorizontalScale(100),
		height: Sizes.smartHorizontalScale(100),
	},
	coinNumber: {
		...Fonts.centuryGothic,
		fontWeight: 'bold',
		fontSize: Sizes.smartHorizontalScale(18),
		color: Colors.pink,
		marginTop: Sizes.smartHorizontalScale(10),
	},
	coinTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.pink,
	},
	contentContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		marginTop: Sizes.smartHorizontalScale(3),
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		textTransform: 'uppercase',
		marginBottom: Sizes.smartHorizontalScale(5),
	},
	textContent: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.gray,
		textAlign: 'right',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: Sizes.smartVerticalScale(7),
	},
	claimedText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.sushi,
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	textIcon: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.pink,
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	separator: {
		borderWidth: 1,
		borderColor: Colors.dustWhite,
		height: Sizes.smartVerticalScale(2),
	},
} as any);
