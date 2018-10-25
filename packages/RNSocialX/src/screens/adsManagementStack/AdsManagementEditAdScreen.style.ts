import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: Colors.wildSand,
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
		paddingLeft: Sizes.smartVerticalScale(24),
		paddingVertical: Sizes.smartVerticalScale(20),
		backgroundColor: 'white',
	},
	separator: {
		borderWidth: 1,
		borderColor: Colors.dustWhite,
		height: Sizes.smartVerticalScale(2),
	},
	header: {
		paddingVertical: Sizes.smartVerticalScale(15),
		paddingHorizontal: Sizes.smartHorizontalScale(24),
	},
	headerText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	transactionsContainer: {
		backgroundColor: Colors.white,
		marginTop: Sizes.smartVerticalScale(27),
	},
};

export default StyleSheet.create(styles) as any;

export const defaultStyles = {};
