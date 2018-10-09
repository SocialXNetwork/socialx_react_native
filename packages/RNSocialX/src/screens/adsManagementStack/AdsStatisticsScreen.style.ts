import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	transactions: {},
	header: {
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.wildSand,
		padding: Sizes.smartHorizontalScale(16),
	},
	headerText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
	},
	transaction: {
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.wildSand,
		padding: Sizes.smartHorizontalScale(16),
	},
	text: {
		...Fonts.centuryGothic,
		color: Colors.tundora,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	separator: {
		width: '100%',
		height: Sizes.smartVerticalScale(20),
		backgroundColor: Colors.wildSand,
	},
};

export default StyleSheet.create(styles);
