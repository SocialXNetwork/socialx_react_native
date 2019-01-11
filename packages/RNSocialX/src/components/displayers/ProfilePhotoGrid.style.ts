import { StyleSheet } from 'react-native';

import { Colors, Sizes } from '../../environment/theme';

export const GRID_ITEM_SIZE = Sizes.getThumbSize();

const style: any = {
	container: {
		flex: 1,
	},
	item: {
		width: GRID_ITEM_SIZE,
		height: GRID_ITEM_SIZE,
	},
	border: {
		borderTopWidth: 2,
		borderColor: Colors.white,
	},
	center: {
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderColor: Colors.white,
	},
	storybook: {
		width: GRID_ITEM_SIZE,
		height: GRID_ITEM_SIZE,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#888',
		borderWidth: 2,
		borderColor: Colors.white,
	},
};

export default StyleSheet.create(style);
