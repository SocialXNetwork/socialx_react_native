import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: Sizes.smartHorizontalScale(16),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingTop: Sizes.smartVerticalScale(10),
		borderTopColor: Colors.white,
		borderTopWidth: Sizes.smartVerticalScale(1),
	},
	text: {
		...Fonts.centuryGothic,
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(16),
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	likes: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	comments: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(24),
		color: Colors.white,
		transform: [{ translateY: -2 }],
	},
};

export default StyleSheet.create(styles);
