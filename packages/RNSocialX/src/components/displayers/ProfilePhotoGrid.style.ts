import { StyleSheet } from 'react-native';

import { Colors, Sizes } from '../../environment/theme';

export const USER_MEDIA_THUMB_SIZE = Sizes.getThumbSize();

const style: any = {
	container: {
		flex: 1,
	},
	gridMediaThumb: {
		width: USER_MEDIA_THUMB_SIZE,
		height: USER_MEDIA_THUMB_SIZE,
		borderBottomWidth: 2,
		borderColor: Colors.white,
	},
	centerGridItem: {
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderColor: Colors.white,
	},
	storybook: {
		width: USER_MEDIA_THUMB_SIZE,
		height: USER_MEDIA_THUMB_SIZE,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#888',
		borderWidth: 2,
		borderColor: Colors.white,
	},
};

export default StyleSheet.create(style);
