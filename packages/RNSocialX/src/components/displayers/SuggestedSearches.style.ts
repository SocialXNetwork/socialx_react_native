import { StyleSheet } from 'react-native';
import { Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
	},
	title: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(20),
		paddingTop: Sizes.smartVerticalScale(16),
		paddingLeft: Sizes.smartHorizontalScale(25),
	},
};

export default StyleSheet.create(styles);
