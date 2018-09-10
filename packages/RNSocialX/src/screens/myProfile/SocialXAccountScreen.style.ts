import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(26),
		backgroundColor: Colors.white,
	},
	buttonContainer: {
		paddingBottom: Sizes.smartVerticalScale(28),
	},
	accountTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(60),
		color: Colors.postFullName,
		paddingTop: Sizes.smartVerticalScale(28),
	},
	bottomContainer: {
		paddingTop: Sizes.smartVerticalScale(45),
	},
};

export default StyleSheet.create(styles);
export const borderColor = Colors.transparent;
