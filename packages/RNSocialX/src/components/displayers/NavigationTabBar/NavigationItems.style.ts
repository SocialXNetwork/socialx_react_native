import {StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../../environment/theme';

const ICON_PADDING = Sizes.smartVerticalScale(12);

const styles: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: Colors.tabBarBottomBg,
	},
	menuItemContainer: {
		width: '20%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		padding: ICON_PADDING,
	},
};

export default StyleSheet.create(styles);
