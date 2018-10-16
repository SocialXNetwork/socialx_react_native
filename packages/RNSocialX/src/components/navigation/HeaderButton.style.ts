import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

export const HEADER_BUTTON_SIZE = Sizes.smartHorizontalScale(30);

const styles: any = {
	icon: {
		width: HEADER_BUTTON_SIZE,
		height: HEADER_BUTTON_SIZE,
	},
};

export const defaultColor = Colors.white;
export default StyleSheet.create(styles);
