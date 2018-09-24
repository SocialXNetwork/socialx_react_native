import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../environment/theme';

const styles: any = {
	container: {
		backgroundColor: Colors.black,
		height: Sizes.smartVerticalScale(70),
		borderRadius: Sizes.smartHorizontalScale(5),
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: Sizes.smartVerticalScale(10),
		marginHorizontal: Sizes.smartHorizontalScale(4),
	},
	name: {
		...Fonts.centuryGothicBold,
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(16),
		paddingTop: Sizes.smartVerticalScale(10),
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	active: {
		width: '50%',
		height: 2,
		backgroundColor: Colors.white,
		borderRadius: 1,
	},
};

export default StyleSheet.create(styles);
