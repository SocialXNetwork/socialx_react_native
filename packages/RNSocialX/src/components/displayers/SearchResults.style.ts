import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: Sizes.smartVerticalScale(10),
	},
	spinner: {
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	shortMessage: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.silverSand,
	},
	messageContainer: {
		paddingVertical: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
};

export default StyleSheet.create(styles);
