import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	commentsList: {
		flex: 1,
	},
};

export default StyleSheet.create(styles);

export const defaultStyles = {
	commentWidthThreshold: Sizes.smartHorizontalScale(150),
	commentsLikeBottomStartPosition: Sizes.smartHorizontalScale(-18),
	commentsLikeBottomAdaptivePosition: Sizes.smartHorizontalScale(10),
	commentsLikeRightAdaptivePosition: Sizes.smartHorizontalScale(-30),
};
