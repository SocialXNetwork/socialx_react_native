import { StyleSheet } from 'react-native';
import { Sizes } from '../../environment/theme';

export const HEADER_BUTTON_SIZE = Sizes.smartHorizontalScale(30);

export default StyleSheet.create({
	icon: {
		width: HEADER_BUTTON_SIZE,
		height: HEADER_BUTTON_SIZE,
	},
});
