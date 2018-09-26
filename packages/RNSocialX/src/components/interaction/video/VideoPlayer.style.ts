import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const styles: any = {
	container: {
		width: '100%',
		height: Sizes.smartVerticalScale(150),
	},
	videoObject: {
		width: '100%',
		height: '100%',
		backgroundColor: Colors.midnight,
	},
};

export default StyleSheet.create(styles);
