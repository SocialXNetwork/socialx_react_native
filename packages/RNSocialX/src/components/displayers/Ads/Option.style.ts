import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const ICON_SIZE = Sizes.smartHorizontalScale(24);

const styles: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: Sizes.smartVerticalScale(15),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	optionContainer: {
		flex: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		marginRight: Sizes.smartHorizontalScale(15),
	},
	icon: {
		fontSize: ICON_SIZE,
		color: Colors.pink,
		marginRight: Sizes.smartHorizontalScale(15),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
	},
	arrowContainer: {
		flex: 1,
		height: '100%',
		alignItems: 'flex-end',
	},
	arrow: {
		fontSize: ICON_SIZE,
		color: Colors.pink,
	},
};

export default StyleSheet.create(styles);
