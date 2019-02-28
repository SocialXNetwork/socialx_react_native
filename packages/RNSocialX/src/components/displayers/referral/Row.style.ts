import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		backgroundColor: Colors.white,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: Sizes.smartVerticalScale(45),
		borderTopWidth: 1,
		borderColor: Colors.dustWhite,
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
	},
	border: {
		color: Colors.dustyGray,
		paddingVertical: Sizes.smartVerticalScale(4),
		paddingHorizontal: Sizes.smartHorizontalScale(6),
		borderWidth: 1,
		borderRadius: Sizes.smartHorizontalScale(5),
		borderColor: Colors.dustWhite,
	},
};

export default StyleSheet.create(styles);
