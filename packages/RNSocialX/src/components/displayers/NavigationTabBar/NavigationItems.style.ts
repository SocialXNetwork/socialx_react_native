import {StyleSheet} from 'react-native';
import {Sizes} from '../../../environment/theme';

const ICON_PADDING = Sizes.smartVerticalScale(12);

const styles: any = {
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
