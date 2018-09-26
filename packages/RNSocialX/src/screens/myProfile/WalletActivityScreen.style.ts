import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	walletContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: Sizes.smartVerticalScale(20),
	},
	activity: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	heading: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(0),
		color: Colors.postFullName,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(styles);
