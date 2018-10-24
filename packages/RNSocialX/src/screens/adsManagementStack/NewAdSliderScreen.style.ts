import { StyleSheet } from 'react-native';
import { Colors } from '../../environment/theme';

const style: any = {
	rootView: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	invisibleDot: {
		width: 0,
		height: 0,
	},
	scrollContent: {
		// width: '300%',
		width: '100%',
	},
};

export default StyleSheet.create(style);
