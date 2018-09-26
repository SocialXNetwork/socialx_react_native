import {StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../../environment/theme';

export const THUMBNAIL_SIZE = Sizes.getThumbSize();

const styles: any = {
	image: {
		width: THUMBNAIL_SIZE,
		height: THUMBNAIL_SIZE,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: Colors.white,
	},
	videoContainer: {
		width: THUMBNAIL_SIZE * 3,
		height: THUMBNAIL_SIZE * 2,
		flexDirection: 'row',
	},
	video: {
		width: THUMBNAIL_SIZE * 2,
		height: THUMBNAIL_SIZE * 2,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: Colors.white,
	},
	leftVideo: {
		borderRightWidth: 1,
		borderColor: Colors.white,
	},
	rightVideo: {
		borderLeftWidth: 1,
		borderColor: Colors.white,
	},
	middle: {
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: Colors.white,
	},
	text: {
		color: 'white',
		fontSize: 25,
		position: 'absolute',
	},
};

export default StyleSheet.create(styles);
