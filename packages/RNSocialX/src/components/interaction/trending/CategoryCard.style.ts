import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		height: Sizes.smartVerticalScale(70),
		borderRadius: Sizes.smartHorizontalScale(5),
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginHorizontal: Sizes.smartHorizontalScale(4),
		overflow: 'hidden',
	},
	name: {
		...Fonts.centuryGothicBold,
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(16),
		paddingTop: Sizes.smartVerticalScale(10),
		paddingBottom: Sizes.smartVerticalScale(5),
		position: 'absolute',
		bottom: 10,
	},
	active: {
		width: '50%',
		height: 2,
		backgroundColor: Colors.white,
		borderRadius: 1,
		position: 'absolute',
		bottom: 10,
	},
};

export default StyleSheet.create(styles);
