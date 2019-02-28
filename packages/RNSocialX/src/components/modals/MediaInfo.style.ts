import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const ROW_LINE_HEIGHT = Sizes.smartHorizontalScale(30);

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	boxContainer: {
		backgroundColor: Colors.white,
		alignItems: 'center',
		borderRadius: Sizes.smartHorizontalScale(9),
		maxWidth: 500,
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(18),
		color: Colors.rhino,
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingTop: Sizes.smartVerticalScale(14),
	},
	infoContainer: {
		flexDirection: 'row',
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		paddingVertical: Sizes.smartVerticalScale(15),
	},
	fieldTitle: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
		lineHeight: ROW_LINE_HEIGHT,
	},
	fieldValue: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
		lineHeight: ROW_LINE_HEIGHT,
	},
	filedValueLink: {
		color: Colors.postHour,
		textDecorationLine: 'underline',
	},
	infoTitles: {
		borderRightColor: Colors.iron,
		borderRightWidth: Sizes.smartHorizontalScale(2),
		paddingRight: Sizes.smartHorizontalScale(10),
		marginRight: Sizes.smartHorizontalScale(10),
	},
});
