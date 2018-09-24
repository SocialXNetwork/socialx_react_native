import {StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../../environment/theme';

export const THUMBNAIL_SIZE = Sizes.getThumbSize();

const styles: any = {
	image: {
		width: THUMBNAIL_SIZE,
		height: THUMBNAIL_SIZE,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderColor: Colors.white,
	},
	videoContainer: {
		width: THUMBNAIL_SIZE * 3,
		height: THUMBNAIL_SIZE * 2,
		flexDirection: 'row',
	},
	imageWithVideo: {
		width: THUMBNAIL_SIZE,
		height: THUMBNAIL_SIZE,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderColor: Colors.white,
	},
	video: {
		width: THUMBNAIL_SIZE * 2,
		height: THUMBNAIL_SIZE * 2,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderColor: Colors.white,
	},
	leftVideo: {
		borderRightWidth: 2,
		borderColor: Colors.white,
	},
	rightVideo: {
		borderLeftWidth: 2,
		borderColor: Colors.white,
	},
	middle: {
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderColor: Colors.white,
	},
	text: {
		color: 'white',
		fontSize: 25,
	},
};

export default StyleSheet.create(styles);
